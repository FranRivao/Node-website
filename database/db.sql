DROP DATABASE pizzeria;
CREATE DATABASE pizzeria;

USE pizzeria;

-- Roles Table
CREATE TABLE roles(
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    role VARCHAR(16) NOT NULL UNIQUE KEY
);

INSERT INTO roles(role) VALUE ('user');
INSERT INTO roles(role) VALUE ('admin');

-- Users Table
CREATE TABLE users(
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL UNIQUE KEY,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    role INT(11) NOT NULL DEFAULT 1,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_role FOREIGN KEY (role) REFERENCES roles(id)
);

-- Img Table
CREATE TABLE img(
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT(11) NOT NULL,
    link VARCHAR(200) NOT NULL,
    CONSTRAINT fk_id FOREIGN KEY (user_id) REFERENCES users(id)
);

-- INSERT INTO users(username, password, fullname, role) VALUES('Admin', 'Administrador', 'Administrador', 2);

-- Items Table
CREATE TABLE items(
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    price int(5) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    amount int(10) NOT NULL DEFAULT 0
);

-- Cart Table
CREATE TABLE cartItems(
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    item INT(11) NOT NULL,
    amount INT(11) DEFAULT 1,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_item FOREIGN KEY (item) REFERENCES items(id)
);

-- Stadistics Table
-- CREATE TABLE stadistics(
--     id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     item INT(11) NOT NULL,
--     amount INT(11) DEFAULT 1,
--     action VARCHAR(10) NOT NULL,
--     user_id INT(11),
--     created_at timestamp NOT NULL DEFAULT current_timestamp,
--     CONSTRAINT fk_userid FOREIGN KEY (user_id) REFERENCES users(id),
--     CONSTRAINT fk_itemid FOREIGN KEY (item) REFERENCES items(id)
-- );

-- Stock Requests Table
CREATE TABLE stockrequests(
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT(11),
    requested INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_userid FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_requested FOREIGN KEY (requested) REFERENCES items(id)
);