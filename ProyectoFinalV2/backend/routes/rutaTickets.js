// routes/tickets.js
const express = require("express");
const router = express.Router();
const connection = require("../config/db");

const {
	crearTicket,
	canjearTicket,
} = require("../controllers/controladorTickets");

// Ruta para que el admin cree un ticket
router.post("/tickets", crearTicket);

// Ruta para que un usuario canjee un ticket
router.post("/tickets/canjear", canjearTicket);

module.exports = router;
