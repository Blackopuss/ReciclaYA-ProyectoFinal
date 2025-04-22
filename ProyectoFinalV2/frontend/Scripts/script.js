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
});

function toggleMenu() {
	const menu = document.getElementById("menu");
	menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}
