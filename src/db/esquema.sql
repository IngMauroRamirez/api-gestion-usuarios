create database apirestful_usuarios;

use apirestful_usuarios;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre text NOT NULL,
  correo VARCHAR(200) NOT NULL unique,
  edad int null,
  ciudad text null
);