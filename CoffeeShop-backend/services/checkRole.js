require("dotenv").config();

function checkRole(req, res, next) {
  const user = res.locals.user; // Access the decoded token payload
  if (!user || !user.role) {
    console.error("Access denied: No role information available");
    return res.status(403).json({ message: "Access denied: Role information missing" });
  }

  console.log("Role in request:", user.role);

  if (user.role !== process.env.ADMIN_ROLE) { // Use environment variable for `admin` role
    console.error(`Access denied: Role ${user.role} is not authorized for this route`);
    return res.status(403).json({ message: "Access denied: Insufficient privileges" });
  }

  next(); // Proceed to the next middleware if role is authorized
}

module.exports = { checkRole };
