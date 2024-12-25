const express = require('express');
const connection = require('../connection'); // This should point to the updated promise pool

const router = express.Router();
const { authenticateToken } = require('../services/authentication');
const { checkRole } = require('../services/checkRole');


router.post('/productadd', authenticateToken, checkRole, async (req, res) => {
    const product = req.body;

    const query = "INSERT INTO product (name, categoryId, description, price, status) VALUES (?, ?, ?, ?, 'true')";

    try {
        // Use async/await for the query execution
        const [results] = await connection.query(query, [product.name, product.categoryId, product.description, product.price]);
        return res.status(200).json({
            message: "Product added successfully",
            data: results // Optionally send back any results, e.g., inserted product ID
        });
    } catch (err) {
        console.error("Error adding product:", err);
        return res.status(500).json({
            message: "Error adding product",
            error: err.message
        });
    }
});

//Correct
router.get('/productget', authenticateToken, checkRole, async (req, res) => {
    try {
        const query = " SELECT p.id, p.name, p.description, p.price, p.status, c.id AS categoryId, c.name AS categoryName FROM product p INNER JOIN category c ON p.categoryId = c.id";
        

        console.log("Executing Query:", query);
        const [results] = await connection.query(query); // Use the promise-based pool

        if (results.length === 0) {
            console.log("No products found");
            return res.status(200).json({ message: "No products found" });
        }

        console.log("Query Results:", results);
        return res.status(200).json(results);
    } catch (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/getwithCategory/:id', authenticateToken, (req, res) => {
    const id = req.params.id;
    console.log("Category ID received:", id); // Debug log
    const query = "SELECT id, name FROM product WHERE categoryId = ? AND status = 'true'";
    
    connection.query(query, [id], (err, results) => {
        if (!err) {
            console.log("Query results:", results); // Debug log
            return res.status(200).json(results);
        } else {
            console.error("Error in query:", err); // Debug log
            return res.status(500).json(err);
        }
    });
});

// Route to get product details by ID
router.get('/getById/:id', authenticateToken, (req, res) => {
    const id = req.params.id;
    const query = "SELECT id, name, description, price FROM product WHERE id = ?";

    connection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(500).json(err);
        }
    });
});
//Correct
// Route to update a product
// Route to update product details
router.put('/update', authenticateToken, checkRole, async (req, res) => {
    const { id, name, categoryId, description, price } = req.body;
  
    if (!id || !name || !categoryId || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }
  
    const query = `
        UPDATE product 
        SET name = ?, categoryId = ?, description = ?, price = ?
        WHERE id = ?`;
  
    try {
      const [result] = await connection.query(query, [name, categoryId, description || null, price, id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product ID not found" });
      }
  
      res.status(200).json({ message: "Product updated successfully" });
    } catch (err) {
      console.error("Error updating product:", err);
      res.status(500).json({ message: "Error updating product", error: err.message });
    }
  });

// Route to delete a product by ID
router.delete('/delete/:id', authenticateToken, checkRole, async (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM product WHERE id = ?";

    try {
        const [result] = await connection.query(query, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product ID not found" });
        }
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error("Error deleting product:", err);
        return res.status(500).json({ message: "Error deleting product", error: err.message });
    }
});

// Get All Products with Categories (No Authentication Required)
router.get('/getPublic', async (req, res) => {
    try {
        const query = `
            SELECT 
                p.id AS productId, 
                p.name AS productName, 
                p.description, 
                p.price, 
                p.status, 
                c.id AS categoryId, 
                c.name AS categoryName 
            FROM 
                product p 
            INNER JOIN 
                category c 
            ON 
                p.categoryId = c.id 
            WHERE 
                p.status = 'true'
        `;

        const [results] = await connection.query(query); // Use the promise-based pool

        if (results.length === 0) {
            return res.status(200).json({ message: "No products found" });
        }

        return res.status(200).json(results);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error", error: err.message });
    }
});
router.get('/getByCategory/:id', (req, res) => {
    const id = req.params.id;
    console.log("Category ID received:", id); // Debug log

    const query = "SELECT id, name FROM product WHERE categoryId = ? AND status = 'true'";

    connection.query(query, [id], (err, results) => {
        if (!err) {
            console.log("Query results:", results); // Debug log
            return res.status(200).json(results);
        } else {
            console.error("Error in query:", err); // Debug log
            return res.status(500).json(err);
        }
    });
});

module.exports = router;






module.exports = router;
