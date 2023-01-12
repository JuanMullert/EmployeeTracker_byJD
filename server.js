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
    console.log('Connected to the tracker_db database')
);

// first prompt questions
function firstPrompt() {
  inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'menuInput',
            choices: [
              'View all departments',
              'View all roles',
              'View all employees',
              'Add a department',
              'Add a role',
              'Add an employee',
              'Update an employee role', 
              'Quit'
            ]
        }
    ])
    
    .then((answers) => {
        if (answers.menuInput === 'View all departments') {
          viewDepartments();
        }
        else if (answers.menuInput === 'View all roles') {
          viewRoles();
        }
        else if (answers.menuInput === 'View all employees') {
          viewEmployees();
        }
        else if (answers.menuInput === 'Add a department') {
          addDepartment();
        }
        else if (answers.menuInput === 'Add a role') {
          addRole();
        }
        else if (answers.menuInput === 'Add an employee') {
          addEmployee();
        }
        else if (answers.menuInput === 'Update an employee role') {
          updateEmployeeRole();
        }
      })
  };