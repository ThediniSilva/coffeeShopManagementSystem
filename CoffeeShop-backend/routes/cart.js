const express = require("express");
const router = express.Router();
const pool = require("../connection"); // Replace with the correct path to your DB connection
const { authenticateToken } = require("../services/authentication"); // Ensure this is correctly imported

// Add item to the cart
router.post("/add", authenticateToken, async (req, res) => {
    const { product_id, quantity } = req.body;
    const userId = res.locals.user.id;
  
    if (!userId) {
      console.error("User ID is missing from token payload");
      return res.status(400).json({ message: "User ID is required" });
    }
  
    if (!product_id || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }
  
    try {
      const query = `
        INSERT INTO cart (user_id, product_id, quantity) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE quantity = quantity + ?
      `;
  
      await pool.execute(query, [userId, product_id, quantity, quantity]);
      res.status(200).json({ message: "Item added to cart successfully" });
    } catch (err) {
      console.error("Database error:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });
  

// Get cart details for the logged-in user
router.get("/", authenticateToken, async (req, res) => {
  const userId = res.locals.user.id; // Extract user ID from the authenticated token

  try {
    const query = `
      SELECT c.id AS cart_id, p.id AS product_id, p.name AS product_name, c.quantity, p.price 
      FROM cart c 
      INNER JOIN product p ON c.product_id = p.id 
      WHERE c.user_id = ?
    `;

    const [cartItems] = await pool.execute(query, [userId]);
    res.status(200).json({ cart: cartItems });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Remove item from the cart
router.delete("/remove/:product_id", authenticateToken, async (req, res) => {
  const userId = res.locals.user.id; // Extract user ID from the authenticated token
  const productId = req.params.product_id;

  try {
    const query = "DELETE FROM cart WHERE user_id = ? AND product_id = ?";
    const [result] = await pool.execute(query, [userId, productId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.status(200).json({ message: "Item removed from cart successfully" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Clear all items in the cart for the logged-in user
router.delete("/clear", authenticateToken, async (req, res) => {
  const userId = res.locals.user.id; // Extract user ID from the authenticated token

  try {
    const query = "DELETE FROM cart WHERE user_id = ?";
    await pool.execute(query, [userId]);

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
