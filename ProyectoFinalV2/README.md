# Proyecto Final - Sistema de Reciclaje

Este es un sistema web para gestión de usuarios, reciclaje de botellas, niveles y recompensas. El proyecto incluye frontend, backend y base de datos.

## 🔧 Tecnologías utilizadas

- Node.js + Express
- MySQL
- Dotenv
- Nodemon
- MariaDB
- HTML/CSS/JS

---

## Instrucciones para correr el proyecto localmente

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

### 2. Instala dependencias

```bash
cd backend
npm install
```

### 3. Crea archivos locales necesarios

#### 📁 `backend/.env`

Crea un archivo llamado `.env` dentro de la carpeta `backend/` con el siguiente contenido (ajusta tus credenciales):

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=0000
DB_NAME=reciclaje
```

#### 📁 `backend/config/db.js`

Crea un archivo `db.js` dentro de la carpeta `backend/config/` con este contenido:

```js
require("dotenv").config();
const mysql = require("mysql");

const connection = mysql.createConnection({
	host: process.env.DB_HOST || "",
	user: process.env.DB_USER || "",
	password: process.env.DB_PASSWORD || "",
	database: process.env.DB_NAME || "",
});

connection.connect((err) => {
	if (err) throw err;
	console.log(`conectado a la base de datos`);
});

module.exports = connection;
```

> ⚠️ **Importante**: Estos archivos están ignorados en `.gitignore`, por lo que no se incluyen en el repositorio.

---

### 4. Inicia el servidor

```bash
cd backend
npx nodemon app.js
```

---

## 🗃️ Base de datos

Asegúrate de tener una base de datos en MySQL o MariaDB.

---

## 📌 Notas

- Si usas Visual Studio Code, los archivos `.env` y `db.js` aparecerán en gris porque están en `.gitignore`, pero **funcionan perfectamente en local**.

---

## ✅ TODO

- [ ] Agregar rutas protegidas para administradores
- [ ] Validaciones y manejo de errores
- [ ] Documentar API en Swagger

---

## 👨‍💻 Autor

Axel
