const mysql = require('mysql2');
const consoleTable = require('console.table');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'codingLad',
      database:'employees_db'
    },
    console.log('Connected to the employees_db database')
);
