// alert("hola");

document.addEventListener("DOMContentLoaded", () => {
	const usuario = JSON.parse(localStorage.getItem("usuario"));

	if (!usuario) {
		window.location.href = "/login";
		return;
	}

	// Mostrar opción de administrar si es admin
	if (usuario.rol === "admin") {
		const adminLink = document.getElementById("admin-link");
		if (adminLink) {
			adminLink.style.display = "block";
		}
	}

	if (usuario) {
		const btnComenzar = document.getElementById("btn-comenzar");
		btnComenzar.style.display = "none";
		const btnInstrucciones = document.getElementById("btn-instrucciones");
		const panel = document.getElementById("panel-instrucciones");

		if (btnInstrucciones && panel) {
			btnInstrucciones.addEventListener("click", () => {
				panel.classList.toggle("visible");
			});
		}
	}
});

function toggleMenu() {
	const menu = document.getElementById("menu");
	menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}
