require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Ensure proper token extraction

  if (!token) {
    console.error("Token is missing");
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    console.log("Token verified:", decoded);
    res.locals.user = decoded; // Store decoded token payload in `res.locals.user`
    next();
  });
}


module.exports = { authenticateToken };