const express = require('express');
const router = express.Router();
const protect = require('../middileware/authMiddilware');
const authorizeRoles = require('../middileware/roleMiddilware');
const healthCareControllers = require("../controllers/healthCareControllers");

// Only admin can access
router.post('/admin', protect, authorizeRoles('admin'),healthCareControllers.addDocter
);



// Only doctor can access
router.post('/doctor', protect, authorizeRoles('doctor'), (req, res) => {
  res.json({ message: 'Welcome Doctor!' });
});

// Only patient can access
router.get('/patient', protect, authorizeRoles('patient'), (req, res) => {
  res.json({ message: 'Welcome Patient!' });
});

module.exports = router;