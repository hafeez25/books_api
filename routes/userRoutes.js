const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  getUser,
} = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getuser", protect, getUser);
router.get("/logout", logout);

module.exports = router;
