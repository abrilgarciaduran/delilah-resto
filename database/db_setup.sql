/*Creando base de datos Delilah resto*/

CREATE DATABASE delilah_resto;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS ordered_products;
DROP TABLE IF EXISTS payment_methods;
DROP TABLE IF EXISTS order_status;

CREATE TABLE users (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR (60) NOT NULL,
    full_name VARCHAR (255) NOT NULL,
    phone_number INT NOT NULL,
    address VARCHAR (255) NOT NULL,
    user_password VARCHAR (60) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE orders (
    id_order INT PRIMARY KEY AUTO_INCREMENT,
    status enum('new','confirmed','preparing','delivering','delivered', 'cancelled') NOT NULL DEFAULT 'new',
    order_time datetime NOT NULL,
    final_price FLOAT NOT NULL,
    payment_method enum('card', 'cash') NOT NULL DEFAULT 'cash',
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id_user)
);

CREATE TABLE products (
    id_product INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR (255) NOT NULL,
    img_url VARCHAR (255) NOT NULL,
    price INT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE ordered_products (
    id_ordered_products INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    amount INT NOT NULL,
);


/*Creando registros iniciales*/

INSERT INTO users (username, full_name, phone_number, adress, user_password, is_admin)
    VALUES("administrador1", "Delilah Resto", 12345678, "Delilah resto´s adress", "adminpass", TRUE);

INSERT INTO users (username, full_name, phone_number, adress, user_password, is_admin)
    VALUES("administrador1", "Delilah Resto", 12345678, "Delilah resto´s adress", "adminpass", TRUE);



