CREATE DATABASE Project;
USE Project;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image LONGBLOB,
    description TEXT
);

Select * From Products;

CREATE TABLE clientes (
    id int primary key auto_increment,
    nombre varchar(255),
    cedula varchar(20),
    telefono varchar(20),
    correo varchar(255),
    estatura decimal(3,2),
    edad int
);

Select * From clientes;

CREATE TABLE usuarios (
    id int primary key auto_increment,
    nombre varchar(50),
    usuario varchar(30),
    email varchar(100),
    passwords varchar(255)
);

Select * From usuarios;