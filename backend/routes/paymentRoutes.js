const router = require('express').Router()
const userAuth = require("../middileware/authMiddilware");
const authorizeRoles = require("../middileware/roleMiddilware");
const paymentControllers = require("../controllers/paymentControllers");


router.post('/pay',userAuth,authorizeRoles("patient"),paymentControllers.createPayment)




module.exports = router