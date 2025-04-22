// app.js

const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");

// Autenticacion
const puerto = process.env.PORT || 4000;
const rutaHome = require("./routes/rutaHome");
const autenticacion = require("./routes/autenticacion");

// Perfil - Usuario
const usuarioRoutes = require("./routes/rutaPerfil");
app.use("/usuarios", usuarioRoutes);

// Ranking
const rankingRoutes = require("./routes/rutaRanking");
app.use(rankingRoutes);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

// Ruta para el home
app.use("/", rutaHome);

// Ruta para el login y signup
app.use("/", autenticacion); // Usate las rutas de autenticacion definidas

// Solo una ruta para el index
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(puerto, () => {
	console.log(`Servidor corriendo en el puerto ${puerto}`);
});
