const express = require('express');
const connection = require('../connection'); // This should point to the updated promise pool

const router = express.Router();
const { authenticateToken } = require('../services/authentication');
const { checkRole } = require('../services/checkRole');


router.post('/productadd', authenticateToken, checkRole, (req, res) => {
    let product = req.body;
    const query = "insert into product(name,categoryId,description,price,status) values(?,?,?,?,'true')";
    connection.query(query, [product.name, product.categoryId, product.description, product.price], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Product added successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
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

router.get('/getByCategory/:id', authenticateToken, (req, res) => {
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
router.patch('/update', authenticateToken, checkRole, (req, res) => {
    const product = req.body;
    const query = "UPDATE product SET name = ?, categoryId = ?, description = ?, price = ? WHERE id = ?";

    connection.query(
        query,
        [product.name, product.categoryId, product.description, product.price, product.id],
        (err, result) => {
            if (!err) {
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Product ID not found" });
                }
                return res.status(200).json({ message: "Product updated successfully" });
            } else {
                return res.status(500).json(err);
            }
        }
    );
});
//Correct
// Route to delete a product by ID
router.delete('/delete/:id', authenticateToken, checkRole, (req, res) => {
    const id = req.params.id; // Get the product ID from the URL
    console.log("Deleting product with ID:", id); // Debug log

    const query = "DELETE FROM product WHERE id = ?";

    connection.query(query, [id], (err, result) => {
        if (!err) {
            if (result.affectedRows === 0) {
                // If no rows were affected, the product ID doesn't exist
                return res.status(404).json({ message: "Product ID not found" });
            }
            // Successfully deleted
            return res.status(200).json({ message: "Product deleted successfully" });
        } else {
            // Log and return error
            console.error("Error deleting product:", err);
            return res.status(500).json(err);
        }
    });
});





module.exports = router;
