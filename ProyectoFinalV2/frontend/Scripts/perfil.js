document.addEventListener("DOMContentLoaded", () => {
	// verificar que primero inicie sesion

	const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

	if (!usuarioGuardado) {
		alert("No has iniciado sesión.");
		window.location.href = "login.html";
		return;
	}

	fetch(`/usuarios/${usuarioGuardado.id}`)
		.then((res) => res.json())
		.then((data) => {
			console.log("Datos del usuario desde backend:", data); // checar porque no jalaba los puntos

			//correcion a lo de arriba, se le cambio el nombre de la db de puntos_totales a puntos, para mas facil y ese era el error

			if (data.success) {
				const usuario = data.usuario;

				// Mostrar contenido según el rol
				const seccionAdmin = document.getElementById("seccion-admin");
				const seccionUsuario = document.getElementById("seccion-usuario");

				const rol = usuario.rol || usuarioGuardado.rol;

				if (rol === "admin") {
					seccionAdmin.classList.remove("hidden-perfil");
					document.getElementById("perfil-info-admin").innerHTML = `
						<p><strong>Nombre:</strong> ${usuario.nombre} ${usuario.apellido}</p>
						<p><strong>Carrera:</strong> ${usuario.carrera}</p>
						<p><strong>Correo:</strong> ${usuario.correo}</p>
					`;
					document.getElementById("codigo").textContent =
						usuario.codigo || "N/A";
				} else {
					seccionUsuario.classList.remove("hidden-perfil");
					document.getElementById("perfil-info-usuario").innerHTML = `
						<p><strong>Nombre:</strong> ${usuario.nombre} ${usuario.apellido}</p>
						<p><strong>Carrera:</strong> ${usuario.carrera}</p>
						<p><strong>Correo:</strong> ${usuario.correo}</p>
					`;
					document.getElementById("puntos-usuario").textContent =
						usuario.puntos || "0";
				}
			} else {
				alert(data.message);
			}
		})
		.catch((err) => {
			console.error("Error al obtener perfil:", err);
		});
});

//Cerrar la sesion

document.getElementById("cerrar-sesion")?.addEventListener("click", (e) => {
	e.preventDefault();

	// Eliminar usuario del localStorage
	localStorage.removeItem("usuario");

	// Mostrar toast
	const toast = document.getElementById("toast");
	toast.classList.add("show");
	toast.classList.remove("hidden");

	// Ocultar el toast y redirigir
	setTimeout(() => {
		toast.classList.remove("show");
		toast.classList.add("hidden");
		window.location.href = "login.html";
	}, 750); // 1000 = 1 segundo
});

function toggleMenu() {
	const menu = document.getElementById("menu");
	menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}
