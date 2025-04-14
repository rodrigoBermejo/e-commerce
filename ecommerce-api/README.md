# 🌐 E-Commerce API

Esta carpeta contiene la API desarrollada con **Express** y **MongoDB**.

## 📋 Requisitos

Asegúrate de tener instaladas las siguientes herramientas:

- 🟢 **Node.js LTS**
- 🍃 **MongoDB Community Edition**

## 🚀 Instalación

Sigue estos pasos para configurar y ejecutar la API:

1. **Navega a la carpeta `ecommerce-api`:**

   ```bash
   cd ecommerce-api
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

   ```env
   MONGODB_URI=mongodb://localhost:27017
   MONGODB_DB=ecommerce-db
   PORT=5000
   JWT_SECRET=SECRET_KEY
   ```

4. **Inicia el servidor:**

   ```bash
   npm start
   ```

   El servidor estará disponible en `http://localhost:5000`.

## 📖 Endpoints

Consulta la documentación de los endpoints utilizando **Swagger** en la ruta `/swagger`.

---

¡La API está lista para usarse! Si tienes dudas, revisa la documentación o contacta al instructor. 🚀
