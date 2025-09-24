const express = require("express");
const multer = require("multer");
const router = express.Router();
const userAuth = require("../middileware/authMiddilware");
const authorizeRoles = require("../middileware/roleMiddilware");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "uploads/";

    if (req.user.role === "doctor") {
      uploadPath = `uploads/doctors/${req.user._id}`;
    }

    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/",
  userAuth,
  authorizeRoles("doctor"),
  upload.single("file"),
  (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    res.json({
      message: "File uploaded successfully",
      file: req.file,
    });
  }
);

router.get(
  "/files",
  userAuth,
  authorizeRoles("patient", "admin"),
  (req, res) => {
    let directoryPath = path.join(__dirname, "../uploads");

    if (req.user.role === "patient") {
      directoryPath = path.join(__dirname, `../uploads/${req.user._id}`);
    }

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return res.status(500).send("Unable to scan files!");
      }
      res.json(files);
    });
  }
);

module.exports = router;
