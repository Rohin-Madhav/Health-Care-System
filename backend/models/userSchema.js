const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: ["patient", "doctor", "admin"],
    default: "patient",
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
