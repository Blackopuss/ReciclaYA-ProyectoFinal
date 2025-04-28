exports.generarCodigoUnico = () => {
	const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let codigo = "";
	for (let i = 0; i < 8; i++) {
		codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
	}
	return codigo;
};
