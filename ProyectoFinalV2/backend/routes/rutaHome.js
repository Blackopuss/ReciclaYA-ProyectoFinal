const express = require("express");
const rutaHome = express.Router();

const controllerHome = require("../controllers/controlHome");

rutaHome.get("/home", controllerHome.getHome);

module.exports = rutaHome;
