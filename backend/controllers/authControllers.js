require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exits" });
    }
    user = await new User({
      username,
      email,
      password,
      role,
    });
    await user.save();
    res.status(201).json({
      message: "User registerd succesfully",
      user: { id: user._id, name: user.username, email: user.email ,role:user.role},
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the role provided in the request matches the user's role in the database
    if (role && user.role !== role) {
      return res.status(403).json({ message: "Role mismatch. Please log in with the correct role." });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
     token,
  user: {
    id: user._id,
    username: user.username,
    role: user.role,
    },
  });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};







