const mysql = require('mysql');
const inquirer = require('inquirer');
const ctable = ('console.table')

const port = 3306;

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
    password: 'password',
    database: 'employeeDB',
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`Application running on PORT: ${port}`)
  start();
});

const start = () => {
    inquirer.prompt({
        name: 'action',
        type: 'rawlist',
        message: 'Employee tracking options:',
        choices: [
            'View all employees',
            'View all departments',
            'View all roles',
            'Add employee',
            'Add department',
            'Add role',
            'Update employee role',
            'View budget',
            'Exit',
        ]
    }).then((data) => {
        switch(data.action) {
            case 'View all employees':
                employeeSearch();
                break;
            case 'View all departments':
                viewDept();
                break;
            case 'View all roles':
                viewRole();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Add department':
                addDept();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Update employee role':
                updateRole();
                break;
            case 'View budget':
                viewBudget();
                break;
            case 'Exit':
                connection.end();
        }
    })
};



const employeeSearch = () => {
    const query = 
    "SELECT employee.last_name, employee.first_name, role.title, department.department, role.salary FROM employee JOIN role ON employee.id = role.department_id JOIN department on role.department_id = department.id";
    connection.query(query, (err, res) => {
        console.table(res);
        start();
    });
};

const viewDept = () => {
    const query = 
    "SELECT department.department FROM department"
    connection.query(query, (err, res) => {
        console.table(res);
        start();
    });
};

const viewRole = () => {
    const query = 
    "SELECT role.title, department.department, role.department_id FROM role JOIN department ON role.department_id = department.id"
    connection.query(query, (err, res) => {
        console.table(res);
        start();
    });
};