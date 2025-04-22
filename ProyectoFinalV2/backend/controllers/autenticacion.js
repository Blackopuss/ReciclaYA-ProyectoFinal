// controllers/autenticacion.js
const path = require("path");
const Usuario = require("../models/user");

exports.getLogin = (req, res) => {
	// Sirve el mismo HTML que ya contiene login y signup
	res.sendFile(path.join(__dirname, "../..", "frontend", "login.html"));
};

exports.postLogin = (req, res) => {
	const { correo, contrasena } = req.body;
	Usuario.buscarPorCredenciales(correo, contrasena, (err, resultados) => {
		if (err) {
			console.error("Error al iniciar sesión:", err);
			return res
				.status(500)
				.json({ message: "Error del servidor", success: false });
		}
		if (resultados.length > 0) {
			const usuario = resultados[0]; // Obtener el primer resultado (usuario)
			return res.json({
				message: `Bienvenido, ${usuario.nombre}`,
				success: true,
				usuario: {
					// Enviar los datos del usuario
					id: usuario.id,
					nombre: usuario.nombre,
					apellido: usuario.apellido,
					carrera: usuario.carrera,
					correo: usuario.correo,
					rol: usuario.rol,
				},
			});
		} else {
			return res
				.status(401)
				.json({ message: "Correo o contraseña incorrectos.", success: false });
		}
	});
};

exports.postSignup = (req, res) => {
	const { nombre, apellido, carrera, correo, contrasena } = req.body;
	console.log("Datos recibidos de signup:", req.body);

	Usuario.existeEmail(correo, (err, resultados) => {
		if (err) {
			console.error("Error al verificar email:", err);
			return res
				.status(500)
				.json({ message: "Error del servidor", success: false });
		}
		if (resultados.length > 0) {
			return res.status(400).json({
				message: "Ya existe un usuario con ese correo.",
				success: false,
			});
		}

		Usuario.crear({ nombre, apellido, carrera, correo, contrasena }, (err) => {
			if (err) {
				console.error("Error al crear usuario:", err);
				return res.status(500).json({
					message: "Error al registrar usuario",
					success: false,
				});
			}
			console.log("Usuario registrado exitosamente");
			return res.json({ message: "Registro exitoso.", success: true });
		});
	});
};
