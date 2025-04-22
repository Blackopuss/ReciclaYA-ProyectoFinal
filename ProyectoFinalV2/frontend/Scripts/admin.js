document.addEventListener("DOMContentLoaded", () => {
	const searchInput = document.getElementById("searchInput");
	const userTableBody = document.querySelector("#userTable tbody");
	const editForm = document.getElementById("editForm");
	const editUserForm = document.getElementById("editUserForm");

	// Buscar usuarios
	searchInput.addEventListener("input", () => {
		const query = searchInput.value;

		fetch(`http://localhost:3000/buscar-usuario?nombre=${query}`)
			.then((response) => response.json())
			.then((data) => {
				const usuarios = data.usuarios;
				userTableBody.innerHTML = "";
				usuarios.forEach((usuario, index) => {
					const row = document.createElement("tr");
					row.innerHTML = `
              <td>${index + 1}</td>
              <td>${usuario.nombre} ${usuario.apellido}</td>
              <td>${usuario.carrera}</td>
              <td>${usuario.puntos}</td>
              <td>${usuario.nivel_actual}</td>
              <td>
			  <button class="editBtn" data-id="${usuario.id}">Editar</button>
			  <button class="deleteBtn" data-id="${usuario.id}">Eliminar</button>
			  </td>`;
					userTableBody.appendChild(row);
				});

				// Manejar clic en botón de edición
				const editButtons = document.querySelectorAll(".editBtn");
				editButtons.forEach((button) => {
					button.addEventListener("click", (e) => {
						const usuarioId = e.target.getAttribute("data-id");
						const usuario = usuarios.find((u) => u.id == usuarioId);
						document.getElementById("userId").value = usuario.id;
						document.getElementById("editNombre").value = usuario.nombre;
						document.getElementById("editApellido").value = usuario.apellido;
						document.getElementById("editCarrera").value = usuario.carrera;
						document.getElementById("editPuntos").value = usuario.puntos;
						document.getElementById("editNivel").value = usuario.nivel_actual;
						editForm.style.display = "block";
					});
				});
			})
			.catch((error) => console.error("Error al buscar usuarios:", error));
	});

	// Editar usuario
	editUserForm.addEventListener("submit", (e) => {
		e.preventDefault();

		const userId = document.getElementById("userId").value;
		const nombre = document.getElementById("editNombre").value;
		const apellido = document.getElementById("editApellido").value;
		const carrera = document.getElementById("editCarrera").value;
		const puntos = document.getElementById("editPuntos").value;
		const nivel = document.getElementById("editNivel").value;

		fetch("http://localhost:3000/editar-usuario", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: userId,
				nombre,
				apellido,
				carrera,
				puntos,
				nivel_actual: nivel,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					mostrarToast("Usuario actualizado con éxito.");
					editForm.style.display = "none";
					searchInput.dispatchEvent(new Event("input"));
				}
			})
			.catch((error) => console.error("Error al editar el usuario:", error));
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

function mostrarToast(mensaje) {
	const toast = document.getElementById("toast-success");
	toast.textContent = "✅ " + mensaje;
	toast.classList.remove("hidden");
	toast.classList.add("show");

	setTimeout(() => {
		toast.classList.remove("show");
		toast.classList.add("hidden");
	}, 750);
}
