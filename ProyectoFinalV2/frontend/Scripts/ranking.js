document.addEventListener("DOMContentLoaded", () => {
	// verificar que primero inicie sesion

	const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

	if (!usuarioGuardado) {
		alert("No has iniciado sesión.");
		window.location.href = "login.html";
		return;
	}

	fetch("http://localhost:3000/ranking")
		.then((response) => response.json())
		.then((data) => {
			console.log("Datos recibidos del backend: ", data);

			const ranking = data.ranking;
			const tbody = document.querySelector("#tabla-ranking tbody");

			// Asegurarse de que tbody existe
			if (!tbody) {
				console.error("No se encontró el tbody de la tabla.");
				return;
			}

			// Limpiar la tabla antes de agregar los nuevos datos
			tbody.innerHTML = "";

			// Insertar datos en la tabla
			ranking.forEach((usuario, index) => {
				const fila = document.createElement("tr");
				fila.innerHTML = `
					<td>${index + 1}</td>
					<td>${usuario.nombre} ${usuario.apellido}</td>
					<td>${usuario.carrera}</td>
					<td>${usuario.puntos}</td>
					<td>${usuario.nivel_actual}</td>
				`;
				tbody.appendChild(fila);
			});
		})
		.catch((error) => {
			console.error("Error al cargar el ranking:", error);
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
