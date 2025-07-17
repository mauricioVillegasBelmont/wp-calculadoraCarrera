# 🧩 Plugin/Proyecto Frontend - Guía de Inicio
Este proyecto contiene una integración entre un plugin WordPress y un frontend moderno usando Webpack . Es necesario compilar los archivos antes de usarlos en producción.

---

## 🚀 Requisitos previos
Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) v16+ (incluye `npm`)
- Un entorno WordPress activo (local o remoto)

---

## 📦 Instalación

Primero instala las dependencias del proyecto:

```bash
npm install
```
🛠️ ¿Por qué necesitas npm run build?
El comando npm run build:

Transforma el código fuente (src/) en JavaScript/CSS optimizado
Genera los archivos listos para producción en la carpeta dist/ o build/
Permite que el plugin cargue assets livianos y eficientes desde WordPress

##🔨 Comandos disponibles:
Comando	        | Descripción:
--------------- | --------------------------------------------------------------
`npm install`	  | Instala todas las dependencias necesarias
`npm run dev`	  | Ejecuta el build en modo desarrollo (watch mode)
`npm run build`	| Genera archivos optimizados para producción

---

##⚠️ Nota importante
- El plugin NO funcionará correctamente si no ejecutas npm run build después de clonar o descargar el proyecto por primera vez.

---

##📂 Archivos importantes:
Carpeta/    | Archivo	Propósito
----------- | ----------------------------------------
src/        |	Código fuente JavaScript / SCSS
dist/     	| Archivos generados (JS/CSS minificados)
plugin.php	| Entrada principal del plugin WordPress

---

###🧠 Ayuda
¿Problemas al compilar? Verifica:
- Que tienes Node.js correctamente instalado (node -v)
- Que no hay errores en la consola al correr npm run build