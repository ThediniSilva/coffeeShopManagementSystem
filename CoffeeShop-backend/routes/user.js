const express = require('express');
const pool = require('../connection'); // Import the MySQL pool
const router = express.Router();
const bcrypt = require("bcrypt");


const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { authenticateToken } = require('../services/authentication'); // Import authentication middleware
const { checkRole } = require('../services/checkRole'); // Import role-check middleware
require('dotenv').config();

// Signup Route
router.post('/signup', async (req, res) => {
    const user = req.body;
    try {
        const [rows] = await pool.execute(
            "SELECT email FROM user WHERE email = ?",
            [user.email]
        );

        if (rows.length === 0) {
            const [result] = await pool.execute(
                "INSERT INTO user (name, contactNumber, email, password, status, role) VALUES (?, ?, ?, ?, 'false', 'user')",
                [user.name, user.contactNumber, user.email, user.password]
            );

            return res.status(200).json({ message: "Success", userId: result.insertId });
        } else {
            return res.status(400).json({ message: "Email already exists" });
        }
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Error", error: err.message });
    }
});



// Login Route
// Login Route
// Login Route
router.post('/login', async (req, res) => {
    const user = req.body;
    try {
        const [results] = await pool.execute(
            "SELECT id, email, password, role, status FROM user WHERE email = ?",
            [user.email]
        );

        // Check if user exists and password matches
        if (results.length === 0 || results[0].password !== user.password) {
            return res.status(401).json({ message: "Incorrect Username and Password" });
        }

        // Successful login
        const response = { 
            id: results[0].id, // Include the user ID here
            email: results[0].email, 
            role: results[0].role 
        };

        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
        
        return res.status(200).json({ 
            token: accessToken, 
            user: response // Include user data along with the token
        });
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Error", error: err.message });
    }
});


  

// Forgot Password Route
router.post('/forgotpassword', async (req, res) => {
    const user = req.body;
    try {
        const [results] = await pool.execute(
            "SELECT email, password FROM user WHERE email = ?",
            [user.email]
        );

        if (results.length === 0) {
            return res.status(404).json({ message: "Email not found" });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: results[0].email,
            subject: 'Password Recovery',
            
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ message: "Failed to send email", error: error.message });
            } else {
                console.log("Email sent successfully:", info.response);
                return res.status(200).json({ message: "Password sent successfully to your email." });
            }
        });
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

// Get All Users (Admin Only)
router.get('/users', authenticateToken, checkRole, async (req, res) => {
    try {
        const [results] = await pool.execute("SELECT id, name, email, contactNumber, status FROM user");
        return res.status(200).json(results);
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Error", error: err.message });
    }
});

// // Get User Details (User Only)
// router.get('/user', authenticateToken, async (req, res) => {
//     const email = res.locals.email;
//     try {
//         const [results] = await pool.execute(
//             "SELECT id, name, email, contactNumber, status FROM user WHERE email = ?",
//             [email]
//         );

//         if (results.length === 0) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         return res.status(200).json(results[0]);
//     } catch (err) {
//         console.error("Database error:", err);
//         return res.status(500).json({ message: "Error", error: err.message });
//     }
// });

//update user 
router.put('/users/:id', authenticateToken, async (req, res) => {
    const userId = req.params.id;
    const { name, contactNumber, email } = req.body;

    console.log('User ID:', userId);
    console.log('Received Data:', req.body); // Check what data backend receives

    try {
        const [result] = await pool.execute(
            "UPDATE user SET name = ?, contactNumber = ?, email = ? WHERE id = ?",
            [name, contactNumber, email, userId]
        );

        if (result.affectedRows === 0) {
            console.log('No rows updated.');
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Error", error: err.message });
    }
});

// Delete User Route (Admin Only)
router.delete('/users/:id', authenticateToken, checkRole, async (req, res) => {
    const userId = req.params.id;

    try {
        const [result] = await pool.execute(
            "DELETE FROM user WHERE id = ?",
            [userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Error", error: err.message });
    }
});
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Get User Details (Logged-in User)
// router.get('/user', authenticateToken, async (req, res) => {
//     const email = res.locals.user.email; // Get logged-in user's email from token
//     try {
//         const [results] = await pool.execute(
//             "SELECT id, name, email, contactNumber, status FROM user WHERE email = ?",
//             [email]
//         );

//         if (results.length === 0) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         return res.status(200).json(results[0]); // Return only the user's details
//     } catch (err) {
//         console.error("Database error:", err);
//         return res.status(500).json({ message: "Error", error: err.message });
//     }
// });
// // Update Logged-in User Profile
// router.put('/user', authenticateToken, async (req, res) => {
//     const email = res.locals.user.email; // Get logged-in user's email from token
//     const { name, contactNumber, password } = req.body; // Only allow updates for specific fields

//     try {
//         const [result] = await pool.execute(
//             "UPDATE user SET name = ?, contactNumber = ?, password = ? WHERE email = ?",
//             [name, contactNumber, password, email]
//         );

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         return res.status(200).json({ message: "Profile updated successfully" });
//     } catch (err) {
//         console.error("Database error:", err);
//         return res.status(500).json({ message: "Error", error: err.message });
//     }
// });
// // Delete Logged-in User Profile
// router.delete('/user', authenticateToken, async (req, res) => {
//     const email = res.locals.user.email; // Get logged-in user's email from token

//     try {
//         const [result] = await pool.execute(
//             "DELETE FROM user WHERE email = ?",
//             [email]
//         );

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         return res.status(200).json({ message: "Account deleted successfully" });
//     } catch (err) {
//         console.error("Database error:", err);
//         return res.status(500).json({ message: "Error", error: err.message });
//     }
// });
// Get User By ID
router.get('/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        // Query to fetch user by ID
        const [rows] = await pool.execute("SELECT * FROM user WHERE id = ?", [userId]);

        // If no user found, return 404
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the first user
        return res.status(200).json(rows[0]);
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Error fetching user data", error: err.message });
    }
});



module.exports = router