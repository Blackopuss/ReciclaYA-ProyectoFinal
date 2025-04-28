const connection = require("../config/db");
const { generarCodigoUnico } = require("../utils/codigoGenerador");

// Crear un ticket
exports.crearTicket = (req, res) => {
	const { adminId, cantidadBotellas } = req.body;

	if (!adminId || !cantidadBotellas) {
		return res.status(400).json({ success: false, message: "Faltan datos" });
	}

	// Verificar que el adminId corresponde a un usuario con el rol 'admin'
	connection.query(
		`SELECT * FROM usuarios WHERE id = ? AND rol = 'admin'`,
		[adminId],
		async (err, result) => {
			if (err) {
				console.error("Error al verificar administrador:", err);
				return res
					.status(500)
					.json({ message: "Error del servidor", success: false });
			}

			if (result.length === 0) {
				return res
					.status(400)
					.json({ success: false, message: "Administrador no válido" });
			}

			try {
				// Generar un codigo unico para el ticket
				const codigo = generarCodigoUnico();

				// Insertar el ticket en la base de datos
				connection.query(
					`INSERT INTO tickets (codigo, puntos, admin_id) VALUES (?, ?, ?)`,
					[codigo, cantidadBotellas, adminId],
					(err, insertResult) => {
						if (err) {
							console.error("Error al generar ticket:", err);
							return res
								.status(500)
								.json({ message: "Error en el servidor", success: false });
						}

						res.json({
							success: true,
							message: "Ticket generado correctamente",
							ticket: {
								id: insertResult.insertId,
								codigo,
								puntos: cantidadBotellas,
							},
						});
					},
				);
			} catch (err) {
				console.error("Error al generar ticket:", err);
				return res
					.status(500)
					.json({ message: "Error en el servidor", success: false });
			}
		},
	);
};

// Canjear un ticket
exports.canjearTicket = (req, res) => {
	const { codigo, usuarioId } = req.body;

	if (!codigo || !usuarioId) {
		return res.status(400).json({ success: false, message: "Faltan datos" });
	}

	// Buscar el ticket por el código y verificar que no haya sido canjeado
	connection.query(
		`SELECT * FROM tickets WHERE codigo = ? AND canjeado = 0`,
		[codigo],
		(err, tickets) => {
			if (err) {
				console.error("Error al buscar ticket:", err);
				return res
					.status(500)
					.json({ message: "Error del servidor", success: false });
			}

			if (tickets.length === 0) {
				return res
					.status(404)
					.json({ success: false, message: "Código inválido o ya canjeado" });
			}

			const ticket = tickets[0];

			// Marcar el ticket como canjeado
			connection.query(
				`UPDATE tickets SET canjeado = 1, canjeado_por = ?, fecha_canjeo = NOW() WHERE id = ?`,
				[usuarioId, ticket.id],
				(err) => {
					if (err) {
						console.error("Error al canjear ticket:", err);
						return res
							.status(500)
							.json({ message: "Error en el servidor", success: false });
					}

					// Sumar los puntos al usuario
					connection.query(
						`UPDATE usuarios SET puntos = puntos + ? WHERE id = ?`,
						[ticket.puntos, usuarioId],
						(err) => {
							if (err) {
								console.error("Error al sumar puntos al usuario:", err);
								return res
									.status(500)
									.json({ message: "Error en el servidor", success: false });
							}

							res.json({
								success: true,
								message: "Código canjeado correctamente",
								puntosGanados: ticket.puntos,
							});
						},
					);
				},
			);
		},
	);
};
