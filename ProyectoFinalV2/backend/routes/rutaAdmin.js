const express = require("express");
const router = express.Router();
const adminController = require("../controllers/controladorAdmin");

// Buscar usuarios
router.get("/buscar-usuario", adminController.buscarUsuario);

// Editar usuario
router.post("/editar-usuario", adminController.editarUsuario);

module.exports = router;
