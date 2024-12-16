const express = require('express');
const connection = require('../connection'); // Import the MySQL promise pool
const router = express.Router();
const { authenticateToken } = require('../services/authentication');
const { checkRole } = require('../services/checkRole');

// Add Category
router.post('/add', authenticateToken, checkRole, async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Category name is required" });
    }

    try {
        const [results] = await connection.execute("INSERT INTO category (name) VALUES (?)", [name]);
        return res.status(200).json({ message: "Category added successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error", error: err.message });
    }
});

// Get All Categories
router.get('/get', authenticateToken, async (req, res) => {
    try {
        const [results] = await connection.execute("SELECT * FROM category ORDER BY name");
        return res.status(200).json(results);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error", error: err.message });
    }
});

// Update Category
router.patch('/update', authenticateToken, checkRole, async (req, res) => {
    const { id, name } = req.body;

    if (!id || !name) {
        return res.status(400).json({ message: "Category ID and name are required" });
    }

    try {
        const [results] = await connection.execute("UPDATE category SET name = ? WHERE id = ?", [name, id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json({ message: "Category updated successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error", error: err.message });
    }
});
// Delete Category
router.delete('/delete/:id', authenticateToken, checkRole, async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Category ID is required" });
    }

    try {
        const [results] = await connection.execute("DELETE FROM category WHERE id = ?", [id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error", error: err.message });
    }
});


module.exports = router;
