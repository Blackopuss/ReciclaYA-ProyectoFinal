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

	//error mio, tenia estas funciones dentro del obtener ranking XD

	// Buscar usuario por nombre
	buscarPorNombre: (nombre, callback) => {
		const query = `SELECT * FROM usuarios WHERE nombre LIKE ? OR apellido LIKE ?`;
		db.query(query, [`%${nombre}%`, `%${nombre}%`], (err, results) => {
			if (err) return callback(err);
			callback(null, results);
		});
	},

	// Editar usuario
	editarUsuario: (id, datos, callback) => {
		const { nombre, apellido, carrera, puntos, nivel_actual } = datos;
		const query = `UPDATE usuarios SET nombre = ?, apellido = ?, carrera = ?, puntos = ?, nivel_actual = ? WHERE id = ?`;
		db.query(
			query,
			[nombre, apellido, carrera, puntos, nivel_actual, id],
			(err, results) => {
				if (err) return callback(err);
				callback(null, { id, ...datos });
			},
		);
	},
	// Eliminar usuario
	eliminarUsuario: (id, callback) => {
		const query = `DELETE FROM usuarios WHERE id = ?`;
		db.query(query, [id], (err, result) => {
			if (err) return callback(err);
			callback(null, result);
		});
	},
};

module.exports = Usuario;
