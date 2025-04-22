const Usuario = require("../models/user");

exports.getUsuarioPorId = (req, res) => {
	const { id } = req.params;

	const sql = "SELECT * FROM usuarios WHERE id = ?";
	require("../config/db").query(sql, [id], (err, resultados) => {
		if (err) {
			console.error("Error al obtener el usuario:", err);
			return res
				.status(500)
				.json({ success: false, message: "Error del servidor" });
		}

		if (resultados.length === 0) {
			return res
				.status(404)
				.json({ success: false, message: "Usuario no encontrado" });
		}

		const usuario = resultados[0];
		return res.json({ success: true, usuario });
	});
};

// // test -- no sirve crashea XD, ir al perfil.js
// localStorage.setItem("usuario", JSON.stringify(data.usuario));
