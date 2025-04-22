const path = require("path");
const Usuario = require("../models/user");

// Buscar usuarios por nombre
exports.buscarUsuario = (req, res) => {
	const nombre = req.query.nombre || "";
	Usuario.buscarPorNombre(nombre, (err, resultados) => {
		if (err) {
			console.error("Error al buscar usuarios:", err);
			return res
				.status(500)
				.json({ message: "Error del servidor", success: false });
		}
		res.json({ success: true, usuarios: resultados });
	});
};

// Editar un usuario
exports.editarUsuario = (req, res) => {
	const { id, nombre, apellido, carrera, puntos, nivel_actual } = req.body;

	Usuario.editarUsuario(
		id,
		{ nombre, apellido, carrera, puntos, nivel_actual },
		(err, resultado) => {
			if (err) {
				console.error("Error al editar usuario:", err);
				return res
					.status(500)
					.json({ message: "Error del servidor", success: false });
			}
			res.json({ success: true, usuario: resultado });
		},
	);
};

// Eliminar usuario
exports.eliminarUsuario = (req, res) => {
	const { id } = req.params;

	Usuario.eliminarUsuario(id, (err, resultado) => {
		if (err) {
			console.error("Error al eliminar usuario:", err);
			return res
				.status(500)
				.json({ success: false, message: "Error al eliminar el usuario" });
		}
		res.json({ success: true, message: "Usuario eliminado correctamente" });
	});
};
