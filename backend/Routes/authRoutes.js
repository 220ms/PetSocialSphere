const express = require("express");
const authController = require("../Controllers/authController.js");

const router = express.Router();

router.post("/signup", authController.signupHandler);
router.post("/login", authController.loginHandler);
router.post("/logout", authController.logoutHandler);
router.get("/refresh", authController.refreshHandler);
router.get("/email/verify/:code", authController.verifyEmailHandler);
router.post("/password/forgot", authController.sendPasswordResetHandler);
router.post("/password/reset/", authController.resetPasswordHandler);
module.exports = router;
