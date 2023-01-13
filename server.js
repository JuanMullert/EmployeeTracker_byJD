// dependecies required 
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
    console.log('Connected to the employees_db database!')
);

// first prompt options
function firstPrompt() {
  inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'ListInput',
            choices: [
              'View all departments',
              'View all roles',
              'View all employees',
              'Add a department',
              'Add a role',
              'Add an employee',
              'Update an employee role', 
              'Exit'
            ]
        }
    ])
    
    // prompt options

    .then((answers) => {
        if (answers.ListInput === 'View all departments') {
          viewDepartments();
        }
        else if (answers.ListInput === 'View all roles') {
          viewRoles();
        }
        else if (answers.ListInput === 'View all employees') {
          viewEmployees();
        }
        else if (answers.ListInput === 'Add a department') {
          addDepartment();
        }
        else if (answers.ListInput === 'Add a role') {
          addRole();
        }
        else if (answers.ListInput === 'Add an employee') {
          addEmployee();
        }
        else if (answers.ListInput === 'Update an employee role') {
          updateEmployeeRole();
        }
      })
  };

  firstPrompt();

// 
function viewDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
      err ? console.err(err) : console.table(results) 
      firstPrompt();
    })
  };
  
  function viewRoles() {
    db.query('SELECT * FROM roles', function (err, results) {
      err ? console.err(err) : console.table(results)
      firstPrompt();
    })
  };
  
  function viewEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
      err ? console.err(err) : console.table(results)
      firstPrompt();
    })
  };
  
  function addDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          message: 'What department would you like to add?',
          name: 'addDepartment'
        }
      ])
      .then((answers) => {
        db.query('INSERT INTO department(name) VALUES(?)', answers.addDepartment, function (err, results) {
          if (err) {
            console.log(err)
          } else {
            db.query('SELECT * FROM department', function (err, results) {
              err ? console.err(err) : console.table(results)
              firstPrompt();
            })
          }
        })
      })
  };
  
  function addRole() {
    const department = () => db.promise().query('SELECT * FROM department')
      .then((rows) => {
          let departmentNames = rows[0].map(obj => ({
            name: obj.name,
            value: obj.id
          }));
          console.log(departmentNames);
          return departmentNames;
    })
    inquirer
      .prompt([
        {
          type: 'input',
          message: 'What role would you like to add?',
          name: 'addRole'
        },
        {
          type: 'input',
          message: 'What is the salary of the role?',
          name: 'addRoleSalary'
        },
        {
          type: 'list',
          message: 'What department does this role belong to?',
          name: 'addRoleDepartment',
          choices: department
        }
      ])
      .then((answers) => {
        db.promise().query('INSERT INTO roles(title, salary, department_id) VALUES(?, ?, ?)', [answers.addRole, answers.addRoleSalary, answers.addRoleDepartment])
        .then(function (results) {
            db.query('SELECT * FROM department', function (err, results) {
              err ? console.err(err) : console.table(results)
              firstPrompt();
            })
        })
        .catch(err => {
          if (err) {
            console.log(err);
          }
        })
      })
  };
  
  function addEmployee() {
    const role = () => db.promise().query('SELECT * FROM roles')
      .then((rows) => {
          let roleNames = rows[0].map(obj => ({
            name: obj.title,
            value: obj.id
          }));
          return roleNames;
    })
    const employee = () => db.promise().query('SELECT * FROM employee')
      .then((rows) => {
          let employeeNames = rows[0].map(obj => ({
            name: `${obj.first_name} ` + `${obj.last_name}`,
            value: obj.id
          }));
          return employeeNames;
    })
    inquirer
      .prompt([
        {
          type: 'input',
          message: 'What is the FIRST NAME of the employee you want to add?',
          name: 'addEmployeeFirstName'
        },
        {
          type: 'input',
          message: 'What is the LAST NAME of the employee you want to add?',
          name: 'addEmployeeLastName'
        },
        {
          type: 'list',
          message: `What is this employee's role?`,
          name: 'addEmployeeRole',
          choices: role
        },
        {
          type: 'list',
          message: 'Who is the manager of this employee?',
          name: 'addEmployeeManager',
          choices: employee
        }
      ])
      .then((answers) => {
        console.log(answers);
        db.promise().query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)', [answers.addEmployeeFirstName, answers.addEmployeeLastName, answers.addEmployeeRole, answers.addEmployeeManager])
        .then(function (results) {
            db.query('SELECT * FROM employee', function (err, results) {
              err ? console.err(err) : console.table(results)
              firstPrompt();
            })
        })
        .catch(err => {
          if (err) {
            console.log(err)
          }
        })
      })
  }
  
  function updateEmployeeRole() {
    const employee = () => db.promise().query('SELECT * FROM employee')
      .then((rows) => {
          let employeeNames = rows[0].map(obj => obj.first_name);
          return employeeNames;
    })
    const role = () => db.promise().query('SELECT * FROM roles')
      .then((rows) => {
          let roleNames = rows[0].map(obj => obj.title);
          return roleNames;
    })
    inquirer
      .prompt([
        {
          type: 'list',
          message: `Which employee's role do you want to update?`,
          name: 'updateEmployeeName',
          choices: employee
        },
        {
          type: 'list',
          message: 'What role do you want to assign to the selected employee?',
          name: 'updateEmployeeRole',
          choices: role
        }
      ])
      .then
  }