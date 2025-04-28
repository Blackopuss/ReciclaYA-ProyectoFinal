document.addEventListener("DOMContentLoaded", () => {
	// verificar que primero inicie sesion
	const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
	console.log("usuarioGuardado:", usuarioGuardado);
	if (!usuarioGuardado) {
		alert("No has iniciado sesión.");
		window.location.href = "login.html";
		return;
	}

	const registrarBtn = document.getElementById("registrar-btn");
	const canjearBtn = document.getElementById("canjear-btn");

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
				}
				if (rol === "usuario") {
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

	// Generar código como admin
	if (registrarBtn) {
		registrarBtn.addEventListener("click", async () => {
			const cantidad = parseInt(
				document.getElementById("cantidad-plastico").value,
			);

			if (!cantidad || cantidad <= 0) {
				alert("Ingresa una cantidad válida de botellas");
				return;
			}

			const adminId = localStorage.getItem("admin_id"); // Asegúrate que esto esté guardado al loguear

			try {
				const res = await fetch("http://localhost:3000/tickets", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						cantidadBotellas: cantidad,
						adminId: adminId,
					}),
				});

				const data = await res.json();
				if (data.success) {
					alert(`Código generado: ${data.ticket.codigo}`);
					document.getElementById("cantidad-plastico").value = "";
				} else {
					alert("Error: " + data.message);
				}
			} catch (error) {
				console.error("Error:", error);
				alert("Ocurrió un error");
			}
		});
	}

	// Canjear código como usuario
	if (canjearBtn) {
		canjearBtn.addEventListener("click", async () => {
			const codigo = document.getElementById("codigo-canjear").value.trim();
			console.log("Código desde el input:", codigo);
			const usuarioId = JSON.parse(localStorage.getItem("usuario")).id;

			if (!codigo || !usuarioId) {
				alert("Faltan datos");
				console.log("Código:", codigo);
				console.log("Usuario ID:", usuarioId);
				return;
			}

			try {
				const res = await fetch("http://localhost:3000/tickets/canjear", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ codigo, usuarioId }),
				});

				const data = await res.json();
				if (data.success) {
					alert(`¡Código canjeado! Ganaste ${data.puntosGanados} puntos`);
					// document.getElementById("cantidad-plastico").value = "";
					document.getElementById("puntos-usuario").textContent =
						parseInt(document.getElementById("puntos-usuario").textContent) +
						data.puntosGanados;
				} else {
					alert("Error: " + data.message);
				}
			} catch (error) {
				console.error("Error:", error);
				alert("Ocurrió un error al canjear el código");
			}
		});
	}
});

//Cerrar la sesion

document.getElementById("cerrar-sesion")?.addEventListener("click", (e) => {
	e.preventDefault();
	console.log("Botón de cerrar sesión clickeado (usuario)");
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
	if (menu) {
		// Añadimos una verificación para asegurarnos de que el elemento existe
		menu.style.display = menu.style.display === "flex" ? "none" : "flex";
	} else {
		console.error("Error: El elemento con id 'menu' no fue encontrado.");
	}
}
