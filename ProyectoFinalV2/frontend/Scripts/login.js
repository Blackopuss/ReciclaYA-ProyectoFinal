const loginSubmit = document.getElementById("login-form");
loginSubmit.addEventListener("submit", (e) => {
	e.preventDefault();

	const correo = document.querySelector(
		"#login-form input[name='correo']",
	).value;
	const contrasena = document.querySelector(
		"#login-form input[name='contrasena']",
	).value;

	fetch("/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ correo, contrasena }), // Asegurate de que aqui usar 'contrasena'
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.success) {
				// Guardar los datos del usuario en localStorage
				localStorage.setItem("usuario", JSON.stringify(data.usuario));

				// Verifica si el usuario es admin
				if (data.usuario.rol === "admin") {
					localStorage.setItem("admin_id", data.usuario.id);
				}
				// Redirigir a home.html
				window.location.href = "home";
			} else {
				alert(data.message);
			}
		})
		.catch((err) => {
			console.error("Error en login:", err);
		});
});
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const toRegister = document.getElementById("to-register");
const toLogin = document.getElementById("to-login");

toRegister.addEventListener("click", () => {
	loginForm.classList.add("hidden");
	loginForm.classList.remove("show");

	registerForm.classList.remove("hidden");
	registerForm.classList.add("show");
});

toLogin.addEventListener("click", () => {
	registerForm.classList.add("hidden");
	registerForm.classList.remove("show");

	loginForm.classList.remove("hidden");
	loginForm.classList.add("show");
});

/// login.js

const registerSubmit = document.getElementById("register-form");
registerSubmit.addEventListener("submit", (e) => {
	e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

	// Recoger los valores del formulario usando 'name'
	const nombre = document.querySelector(
		"#register-form input[name='nombre']",
	).value;
	const apellido = document.querySelector(
		"#register-form input[name='apellido']",
	).value;

	// Cambiar par que lea un select
	const carrera = document.querySelector(
		"#register-form select[name='carrera']",
	).value;

	const correo = document.querySelector(
		"#register-form input[name='correo']",
	).value;
	const contrasena = document.querySelector(
		"#register-form input[name='contrasena']",
	).value;

	// Crear un objeto con los datos para enviar al backend
	const data = { nombre, apellido, carrera, correo, contrasena };

	// Enviar los datos al backend usando fetch
	fetch("/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Error en la solicitud");
			}
			return response.json();
		})
		.then((data) => {
			if (data.success) {
				alert(data.message); // Mostrar el mensaje de exito
				toLogin.click(); // Redirigir al login si el registro es exitoso
			} else {
				alert(data.message); // Mostrar el mensaje de error
			}
		})
		.catch((error) => {
			console.error("Error al registrar usuario:", error);
			alert("Error al registrar usuario");
		});
});
