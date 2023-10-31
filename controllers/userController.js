const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/Token");

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      return res.json({
        message: "Please fil all the required fields!",
      });
    }

    // Check if email exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      return res.json({
        message: "Usser alrady exists",
      });

      // throw new Error("Email has already been registerd!");
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate Token
    const token = await generateToken(user._id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "none",
      secure: true,
    });

    if (user) {
      const { _id, name, email } = user;

      res.status(201).json({
        _id,
        name,
        email,
        token,
      });
    } else {
      res.status(400);

      return res.json({
        message: "Invalid user data",
      });
    }
  } catch (err) {
    res.status(500);

    return res.json({
      message: err,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);

      return res.json({
        message: "Please enter email and password!",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);

      return res.json({
        message: "User not found. Please Register",
      });
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    const token = generateToken(user._id);
    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });
    console.log(passwordIsCorrect);

    if (user && passwordIsCorrect) {
      const { _id, name, email } = user;

      res.status(200);
      res.json({
        _id,
        name,
        email,
        token,
      });
    } else {
      res.status(400);
      res.json({ message: "User data invalid!" });
    }
  } catch (err) {
    res.status(500);
    return res.json({
      message: err,
    });
  }
};

// Logout user
const logout = async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  res.status(200);
  return res.json({
    message: "Successfully Logged Out",
  });
};

const getUser = async (req, res) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      res.status(400);
      return res.json({
        message: "User not found!",
      });
    }
    res.status(200);
    return res.json(user);
  } catch (err) {
    res.status(500);
    return res.json({
      message: "Something bad happen",
    });
  }
};
module.exports = {
  registerUser,
  loginUser,
  logout,
  getUser,
};
