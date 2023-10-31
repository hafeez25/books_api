const User = require("../models/User");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);

      return res.json({
        message: "Not authorized, please login!",
      });
    }

    // verfiy token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Get user id from token
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(401);

      return res.json({
        message: "User not found!",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401);
    console.log("Error");
    return res.json({
      message: "Not authorized, please login!",
    });
  }
};

module.exports = protect;
