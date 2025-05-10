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
			const toast = document.getElementById("toast-codigo");

			if (!cantidad || cantidad <= 0) {
				toast.textContent = "⚠️ Ingresa una cantidad válida de botellas.";
				toast.classList.add("show");
				toast.classList.remove("hidden");

				setTimeout(() => {
					toast.classList.remove("show");
					toast.classList.add("hidden");
				}, 2000);
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
					const codigoGenerado = data.ticket.codigo;
					const puntos = data.ticket.puntos;

					document.getElementById("codigo").textContent = codigoGenerado;
					document.getElementById("cantidad-plastico").value = "";

					// Mostrar toast
					const toast = document.getElementById("toast-codigo");
					toast.textContent = `Código generado: ${codigoGenerado} (${puntos} puntos)`;
					toast.classList.add("show");
					toast.classList.remove("hidden");

					setTimeout(() => {
						toast.classList.remove("show");
						toast.classList.add("hidden");
					}, 1500);
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
			const toast = document.getElementById("toast-codigo");
			const usuarioId = JSON.parse(localStorage.getItem("usuario")).id;

			if (!codigo || !usuarioId) {
				toast.textContent = "❌ Faltan datos para canjear el código.";
				toast.classList.add("show");
				toast.classList.remove("hidden");
				setTimeout(() => {
					toast.classList.remove("show");
					toast.classList.add("hidden");
				}, 3000);
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
					toast.textContent = `✅ ¡Código canjeado! Ganaste ${data.puntosGanados} puntos.`;
					toast.classList.add("show");
					toast.classList.remove("hidden");

					document.getElementById("puntos-usuario").textContent =
						parseInt(document.getElementById("puntos-usuario").textContent) +
						data.puntosGanados;
				} else {
					toast.textContent = `⚠️ ${data.message}`;
					toast.classList.add("show");
					toast.classList.remove("hidden");
				}
			} catch (error) {
				console.error("Error:", error);
				toast.textContent = "🚫 Ocurrió un error al canjear el código.";
				toast.classList.add("show");
				toast.classList.remove("hidden");
			}

			setTimeout(() => {
				toast.classList.remove("show");
				toast.classList.add("hidden");
			}, 2000);
		});
	}
});

// Cerrar sesion - Admin
document
	.getElementById("cerrar-sesion-admin")
	?.addEventListener("click", (e) => {
		e.preventDefault();
		console.log("Botón de cerrar sesión clickeado (admin)");
		localStorage.removeItem("usuario");
		localStorage.removeItem("admin_id");
		const toast = document.getElementById("toast");
		toast.textContent = "Sesión cerrada con éxito.";
		toast.classList.add("show");
		toast.classList.remove("hidden");
		setTimeout(() => {
			toast.classList.remove("show");
			toast.classList.add("hidden");
			window.location.href = "login.html";
		}, 2000);
	});

// Cerrar sesion - Usuario
document
	.getElementById("cerrar-sesion-usuario")
	?.addEventListener("click", (e) => {
		e.preventDefault();
		console.log("Botón de cerrar sesión clickeado (usuario)");
		localStorage.removeItem("usuario");
		const toast = document.getElementById("toast");
		toast.textContent = "Sesión cerrada con éxito.";
		toast.classList.add("show");
		toast.classList.remove("hidden");
		setTimeout(() => {
			toast.classList.remove("show");
			toast.classList.add("hidden");
			window.location.href = "login.html";
		}, 2000);
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
