# Eventos

**Eventos**, una aplicación web de eventos desarrollada como ejercicio práctico para aprender sobre Single Page Applications **(SPA)**, operaciones **CRUD**, manejo de rutas y **autenticación con roles**.

---

## Funcionalidades principales

- Registro e inicio de sesión de usuarios
- Autenticación basada en roles:
  - **Administrador**: puede agregar, editar, ver y eliminar eventos.
  - **Visitante**: puede ver y inscribirse en eventos disponibles
- Operaciones **CRUD** completas sobre eventos (crear, leer, actualizar y eliminar)
- **SPA** con HTML, CSS y JavaScript

---

## ¿Cómo correr el proyecto?

### 1. Instalar dependencias (solo necesitas JSON Server)

Si aún no lo tienes instalado, ejecuta:

#### Si ya existe un package.json, ejecuta
```bash
npm install
```
#### Si no existe un package.json, ejecuta
```bash
npm init -y
npm install json-server
npm install vite
```
### 2. Inserta en package.json
```bash
"scripts": {
    "server":"json-server db.json",
    "dev":"vite",
    "test": "echo\"Error: no test specified\"&& exit 1"
  }
  ```
### 3. Levantar el servidor de datos
**importante => para levantar ambos servidores, tiene que ser en dos distintas terminales en el mismo Visual Studio Code.**
Para levantar con **VITE**:
```bash
npm run dev
```
Para levantar con **JSON server**:
```bash
npm run server
```
Esto iniciará la **API REST** falsa en **VITE** como: **http://localhost:5179/**
y en **JSON server** iniciará la **API REST** falsa como: **http://localhost:3000/**

Para poder utilizar ambos **API REST** lo coloque en mi archivo **api.js** de esta manera :
```bash
const API_URL = ' http://localhost:5176/ http://localhost:3000/';
```
### 4. Abrir la aplicación
Abre el archivo **index.html** con **Live Server**.

Recomendado:

- En **VS Code**, clic derecho sobre index.html → **"Open with Live Server"**

- Abre en tu navegador: **http://127.0.0.1:5500/index.html#/login**

---
## Usuarios y roles
Se pueden registrar como:

- **Visitante:** solo puede ver y inscribirse en eventos disponibles.

- **Administrador:** tiene permisos completos de gestión de eventos.

Los datos del usuario se almacenan en **localStorage** después de iniciar sesión.

---
##  Tecnologías utilizadas
- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **JSON Server**
---
## Información del coder
- **Nombre**: Sarah Orianna Pérez Hernández.
- **Clan**: Hopper.
- **Correo**: soperez2006@gmail.com.
- **Documento de identidad (PPT)**: 2.901.129.
