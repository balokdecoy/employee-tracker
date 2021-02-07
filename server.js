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
        message: 'Test the server',
        choices: [
            'View all employees',
            'View all employees by department',
            'View all employees by manager',
            'Add employee',
            'Remove employee',
            'Update employee role',
            'Update employee manager',
            'View all roles',
            'Add role',
            'Remove role',
            'View all departments',
            'Add department',
            'Remove department',
            'View department budget',
            'Exit',
        ]
    }).then((data) => {
        switch(data.action) {
            case 'View all employees':
                employeeSearch();
                break;
            case 'View all employees by department':
                employeeDept();
                break;
            case 'View all employees by manager':
                employeeManager();
                break;
            case 'Add employee':
                touchEmployee();
                break;
            case 'Remove employee':
                remEmployee();
                break;
            case 'Update employee role':
                updEmployee();
                break;
            case 'Update employee manager':
                updManager();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Remove role':
                remRole();
                break;
            case 'View all departments':
                viewDept();
                break;
            case 'Add department':
                addDept();
                break;
            case 'Remove department':
                remDept();
                break;
            case 'View department budget':
                viewBudget();
                break;
            case 'Exit':
                connection.end();
        }
    })
};



// const employeeSearch = () => {
//     const query = 
//     "SELECT role.department_id, department.name, role.title FROM role JOIN department ON role.department_id = department.id";
//     connection.query(query, (err, res) => {
//         console.table(res)
//     });
// };