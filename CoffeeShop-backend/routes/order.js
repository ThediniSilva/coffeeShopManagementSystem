const express = require("express");
const router = express.Router();
const pool = require("../connection");
const { authenticateToken } = require("../services/authentication");

router.post("/place", authenticateToken, async (req, res) => {
  const userId = res.locals.user.id;

  try {
    const [cartItems] = await pool.execute(
      `SELECT c.product_id, c.quantity, p.price
       FROM cart c
       JOIN product p ON c.product_id = p.id
       WHERE c.user_id = ?`, [userId]
    );

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const conn = await pool.getConnection();
    await conn.beginTransaction();

    const [orderResult] = await conn.execute(
      `INSERT INTO orders (user_id, total_amount) VALUES (?, ?)`,
      [userId, total]
    );
    const orderId = orderResult.insertId;

    for (const item of cartItems) {
      await conn.execute(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    await conn.execute(`DELETE FROM cart WHERE user_id = ?`, [userId]);

    await conn.commit();
    conn.release();

    res.status(201).json({ message: "Order placed successfully", orderId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order placement failed", error: err.message });
  }
});


router.get("/my-orders", authenticateToken, async (req, res) => {
  const userId = res.locals.user.id;

  try {
    const [orders] = await pool.execute(
      `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`, [userId]
    );

    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});


router.get("/:orderId", authenticateToken, async (req, res) => {
  const userId = res.locals.user.id;
  const orderId = req.params.orderId;

  try {
    const [order] = await pool.execute(
      `SELECT * FROM orders WHERE id = ? AND user_id = ?`, [orderId, userId]
    );

    const [items] = await pool.execute(
      `SELECT oi.product_id, p.name, oi.quantity, oi.price 
       FROM order_items oi
       JOIN product p ON oi.product_id = p.id
       WHERE oi.order_id = ?`, [orderId]
    );

    res.json({ order: order[0], items });
  } catch (err) {
    res.status(500).json({ message: "Failed to load order" });
  }
});


// Admin updates order status (e.g., Processing, Complete, Delivered)
router.patch("/update-status/:id", async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  const validStatuses = ["Paid", "Processing", "Complete", "Delivered", "Finished"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const [result] = await pool.execute(
      `UPDATE orders SET payment_status = ? WHERE id = ?`,
      [status, orderId]
    );
if (result.affectedRows === 0 && result.changedRows === 0) {
  return res.status(200).json({ message: "Order already has this status" });
}
    res.json({ message: `Order status updated to ${status}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update status" });
  }
});

// Admin: Get all orders
router.get("/admin/all-orders", async (req, res) => {
  try {
    const [orders] = await pool.execute(
      `SELECT * FROM orders ORDER BY created_at DESC`
    );

    res.status(200).json({ orders });
  } catch (err) {
    console.error("Admin fetch failed:", err);
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
});



module.exports = router;
