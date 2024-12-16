const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Test the database connection
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to MySQL as id ' + connection.threadId);
        connection.release(); // Release the connection back to the pool
    } catch (err) {
        console.error('Error connecting to MySQL:', err.stack);
    }
})();

module.exports = pool;
