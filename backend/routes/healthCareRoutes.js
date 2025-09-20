const router = require('express').Router()
const healthCareControllers = require("../controllers/healthCareControllers")
const protected = require("../middileware/authMiddilware")
const authorizedRole = require("../middileware/roleMiddilware")



router.post("/register",healthCareControllers.registerUser)
router.post("/login",healthCareControllers.loginUser)
router.get('/doctor',protected,healthCareControllers.getDocters)



module.exports = router