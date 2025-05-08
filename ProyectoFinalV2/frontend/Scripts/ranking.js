document.addEventListener("DOMContentLoaded", () => {
	// verificar que primero inicie sesion
	const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

	if (!usuarioGuardado) {
		alert("No has iniciado sesión.");
		window.location.href = "login.html";
		return;
	}

	// Logica para solo 10 filas a la vez y la paginacion
	const filasPorPagina = 10;
	let paginaActual = 1;
	let totalPaginas = 1;
	let ranking = [];

	const tbody = document.querySelector("#tabla-ranking tbody");
	const btnAnterior = document.getElementById("anterior");
	const btnSiguiente = document.getElementById("siguiente");
	const infoPagina = document.getElementById("info-pagina");

	fetch("http://localhost:3000/ranking")
		.then((response) => response.json())
		.then((data) => {
			ranking = data.ranking;
			totalPaginas = Math.ceil(ranking.length / filasPorPagina);
			mostrarPagina(paginaActual);
			actualizarControles();
		})
		.catch((error) => {
			console.error("Error al cargar el ranking:", error);
		});

	function mostrarPagina(pagina) {
		// Limpiar la tabla antes de insertar nuevas filas
		tbody.innerHTML = "";
		const inicio = (pagina - 1) * filasPorPagina;
		const fin = inicio + filasPorPagina;
		const usuariosPagina = ranking.slice(inicio, fin);

		usuariosPagina.forEach((usuario, index) => {
			const fila = document.createElement("tr");
			fila.innerHTML = `
			<td>${inicio + index + 1}</td>
			<td>${usuario.nombre} ${usuario.apellido}</td>
			<td>${usuario.carrera}</td>
			<td>${usuario.puntos}</td>
			<td>${usuario.nivel_actual}</td>
		`;
			tbody.appendChild(fila);
		});

		infoPagina.textContent = `Página ${pagina}`;
	}

	function actualizarControles() {
		btnAnterior.disabled = paginaActual === 1;
		btnSiguiente.disabled = paginaActual === totalPaginas;
	}

	btnAnterior?.addEventListener("click", () => {
		if (paginaActual > 1) {
			paginaActual--;
			mostrarPagina(paginaActual);
			actualizarControles();
		}
	});

	btnSiguiente?.addEventListener("click", () => {
		if (paginaActual < totalPaginas) {
			paginaActual++;
			mostrarPagina(paginaActual);
			actualizarControles();
		}
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
