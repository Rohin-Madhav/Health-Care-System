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
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addDocter = async (req, res) => {
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
      message: "Docter registerd succesfully",
      user: { id: user._id, name: user.username, email: user.email ,role:user.role},
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
};  
exports.getDocters = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }).select('-password');
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
exports.updateDocter = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { username, email },
      { new: true } 
    ).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};



