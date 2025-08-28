const jwt = require("jsonwebtoken");
const User = require("../db/User");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Authorization token missing or malformed" });
    }

    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) throw new Error("No token");

    const decoded = jwt.verify(token, "ahsdfkjhsdfsbdjfk");

    req.userId = decoded._id;

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Please authenticate." });
  }
};

module.exports = auth;
