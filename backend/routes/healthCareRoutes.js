const router = require('express').Router()
const healthCareControllers = require("../controllers/healthCareControllers")

router.post("/register",healthCareControllers.registerUser)
router.post("/login",healthCareControllers.loginUser)

module.exports = router