const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/controladorPerfil");

router.get("/:id", usuarioController.getUsuarioPorId);

module.exports = router;
