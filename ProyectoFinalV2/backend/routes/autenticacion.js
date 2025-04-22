const express = require("express");
const router = express.Router();
const authController = require("../controllers/autenticacion");

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.post("/signup", authController.postSignup);

module.exports = router;
