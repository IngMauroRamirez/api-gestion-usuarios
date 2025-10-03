# API para gestión de usuarios:
Hola y buen día para todos esta es una API RESTFul construida con Node.js, Express y MySQL para poder gestionar usuarios.
Permite realizar crear, consultar (leer), actualizar y eliminar registros de usuarios.

# Requisitos:
- Node.js v 22.20.0 lts
- MySQL v > 8
- npm

# Instalación:
- clonar el repositorio: git clone https://github.com/IngMauroRamirez/api-gestion-usuarios.git
- Instalar dependencias: npm install
- Configurar en el archivo .env las variables de entorno:
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=
  DB_NAME=apirestful_usuarios
  DB_PORT=3306
  APP_PORT=3000
  
# Base de Datos:
- copiar lo que está dentro del script esquema.sql que está dentro de la carpeta de bd.
# Ejecución:
- Ejecutar npm start: ya que en el archivo package.json está configurado para que en la sección script al encontrar start se auto ejecute node src/index.js el cual es el punto de entrada de la api.

# Uso (endpoints) de la API RESTful
Usé POSTMAN para las pruebas: Base URL: http://localhost:3000/api/usuarios
- POST / -> crear usuario
  Body (formato JSON):
  {
    "nombre": "colocar aqui nombre",
    "correo": "colocar aqui el correo",
    "edad": "colocar aqui edad",
    "ciudad": "colocar aqui ciudad"
  }
- GET / -> Obtener todos los usuarios de la base de datos.
- GET /:id -> Obtener la información de un usuario en específico por su id.
- PUT /:id -> Actualizar la información del usuario
  Body (formato JSON):
  {
    "nombre": "colocar aqui nombre",
    "correo": "colocar aqui el correo",
    "edad": "colocar aqui edad",
    "ciudad": "colocar aqui ciudad"
  }
- DELETE /:id -> Eliminar un usuario de la base de datos.

## Autor
Mauro Estefan Ramírez Aranguren.
