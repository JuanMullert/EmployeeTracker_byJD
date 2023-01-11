
DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (

id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) 
);


CREATE TABLE roles (

id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT 
FOREIGN KEY (department_id) 
REFERENCES departments(id)
);


CREATE TABLE employee (

id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30), 
role_id INT,
manager_id INT
FOREIGN KEY (role_id) REFERENCES roles(id),
FOREIGN KEY (manager_id) REFERENCES employees(id)
); 

