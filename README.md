# Pokémon App

¡Bienvenido a **Pokémon App**! Esta aplicación web te permite explorar, buscar y gestionar tu propio equipo Pokémon, con una experiencia moderna y visualmente atractiva.

## 🌐 Demo en línea
¿Quieres probar la app sin instalar nada? Accede aquí:

👉 [pokemon-app-70087.web.app](https://pokemon-app-70087.web.app/)

---

## 🖼️ Capturas de pantalla

<p align="center">
  <img src="public/captura1.png" alt="Captura 1" width="350" />
  <img src="public/captura2.png" alt="Captura 2" width="350" />
  <img src="public/captura3.png" alt="Captura 3" width="350" />
</p>


## 🚀 Características principales
- 🔍 **Búsqueda avanzada** de Pokémon por nombre, tipo y generación
- 📋 **Listado interactivo** con paginación e infinite scroll
- 🏆 **Gestión de equipo Pokémon**: agrega, quita y sincroniza tu equipo en la nube
- 🔒 **Autenticación de usuarios** (registro, login y logout)
- 🎵 **Música de fondo** y efectos visuales animados
- ⚡ **Interfaz responsiva** y diseño con Tailwind CSS
- 🔥 **Integración con Firebase** para datos y autenticación

## 🛠️ Tecnologías utilizadas
- React + TypeScript
- Firebase (Auth & Firestore)
- Vite
- Tailwind CSS


## 💻 Ejecución en local

### Requisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior) y npm
- Un proyecto de Firebase con Authentication y Firestore habilitados

### Pasos
1. Clona el repositorio e ingresa a la carpeta:
   ```bash
   git clone <url-del-repositorio>
   cd Pokemon-App
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env.local` en la raíz del proyecto con las credenciales de tu proyecto de Firebase (podés encontrarlas en *Configuración del proyecto > Tus apps > Configuración del SDK*):
   ```env
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Luego abrí en el navegador la URL que muestra la consola (por defecto `http://localhost:5173`).

### Otros comandos
- `npm run build`: genera la versión de producción en `dist/`.
- `npm run preview`: sirve localmente la versión generada con `build`.
- `npm run lint`: ejecuta ESLint sobre el proyecto.


## ✨ Uso
- Regístrate o inicia sesión para guardar tu equipo Pokémon.
- Explora la lista de Pokémon, filtra por generación o tipo, y agrega tus favoritos a tu equipo.
- Disfruta de la música de fondo y la interfaz animada.

## 📚 Créditos
- Imágenes y datos de Pokémon obtenidos de [PokéAPI](https://pokeapi.co/)
- Iconos y recursos visuales de [Pokémon](https://www.pokemon.com/)

## 📝 Licencia
Este proyecto es de uso educativo y personal. No está afiliado ni respaldado por The Pokémon Company.
