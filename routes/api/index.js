const router = require("express").Router();
const userRoutes = require("./user");
const nodemailerRoutes = require("./nodemailer");


// User routes
router.use("/user", userRoutes);
router.use('/nodemailer', nodemailerRoutes)
module.exports = router;
