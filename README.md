# Proyecto Final Sprint 5 - Gestion de Paises Hispanohablantes

## Objetivos del Proyecto
Desarrollar una aplicacion web bajo la arquitectura MVC empleando Node.js, Express y MongoDB. El sistema consume informacion de una API externa (REST Countries), filtra los paises hispanohablantes, limpia los objetos de propiedades innecesarias, e incorpora un sistema CRUD completo con validaciones robustas para la administracion de la base de datos resultante.

## Tecnologias Usadas
- Backend: Node.js, Express
- Base de Datos: MongoDB Atlas, Mongoose
- Vistas: EJS (Embedded JavaScript), Bootstrap 5
- Utilidades: Axios (consumo de API), express-validator (validacion de datos), method-override (operaciones PUT/DELETE).

## Pasos de Ejecucion
1. Clonar el repositorio.
2. Ejecutar npm install para descargar las dependencias.
3. Asegurarse de contar con el archivo .env en la raiz del proyecto con la variable MONGO_URI y su respectivo acceso a la base de datos.
4. Iniciar el servidor mediante npm start o npm run dev.
5. Visitar la URL provista en consola para la primera inicializacion (Seed) y poblar la base de datos.
6. Operar el sistema desde el Dashboard en las direcciones mostradas en consola.
7. Acceso mediante Render: https://tp-final-sprint-5.onrender.com/paises.

## Consideraciones Especiales
- Filtrado y Normalizacion: El sistema aisla exclusivamente los paises cuyo idioma incluya español. El valor Gini es normalizado extrayendo el año mas reciente de la API.
- Requisitos Avanzados Cumplidos: 
  1. Barra superior de busqueda para filtrado dinamico en el Dashboard.
  2. Fila final de calculo sumatorio de poblacion y area total, ademas de un calculo matematico preciso del promedio Gini que descarta valores inexistentes.
- Ergonomia: Los formularios retienen el estado si el usuario dispara un error de validacion, evitando la perdida de los campos previamente completados.