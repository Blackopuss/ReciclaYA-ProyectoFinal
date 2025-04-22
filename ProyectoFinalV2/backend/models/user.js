// models/usuario.js
const db = require("../config/db");

const Usuario = {
	buscarPorCredenciales: (correo, contrasena, callback) => {
		const sql = "SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?";
		db.query(sql, [correo, contrasena], callback);
	},

	existeEmail: (correo, callback) => {
		const sql = "SELECT * FROM usuarios WHERE correo = ?";
		db.query(sql, [correo], callback);
	},

	crear: (usuario, callback) => {
		const sql =
			"INSERT INTO usuarios (nombre, apellido, carrera, correo, contrasena) VALUES (?, ?, ?, ?, ?)";
		const { nombre, apellido, carrera, correo, contrasena } = usuario;
		db.query(sql, [nombre, apellido, carrera, correo, contrasena], callback);
	},

	// para el ranking
	obtenerRanking: (callback) => {
		const sql = `
		  SELECT nombre, apellido, carrera, puntos, nivel_actual
		  FROM usuarios
		  ORDER BY puntos DESC
		  LIMIT 50
		`;
		db.query(sql, callback);
	},
};

module.exports = Usuario;
