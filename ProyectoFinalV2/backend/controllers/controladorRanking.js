const path = require("path");
const Usuario = require("../models/user");

exports.getRanking = (req, res) => {
	Usuario.obtenerRanking((err, resultados) => {
		if (err) {
			console.error("Error al obtener el ranking:", err);
			return res
				.status(500)
				.json({ message: "Error del servidor", success: false });
		}
		res.json({ success: true, ranking: resultados });
	});
};

exports.getRankingPage = (req, res) => {
	res.sendFile(path.join(__dirname, "../../frontend/ranking.html"));
};
