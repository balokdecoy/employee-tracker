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
    "SELECT employee.last_name, employee.first_name, role.title, department.department, role.salary FROM employee JOIN role ON employee_id = role.role_id JOIN department on role.role_id = department.id";
    connection.query(query, (err, res) => {
        console.table(res);
        start();
    });
};

const viewDept = () => {
    const query = 
    "SELECT * FROM department"
    connection.query(query, (err, res) => {
        console.table(res);
        start();
    });
};

const viewRole = () => {
    const query = 
    "SELECT role.title, department.department, role.role_id FROM role JOIN department ON role.role_id = department.id"
    connection.query(query, (err, res) => {
        console.table(res);
        start();
    });
};

const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'first',
            type: 'input',
            message: 'Enter employee first name',
        },
        {
            name: 'last',
            type: 'input',
            message: 'Enter employee last name',
        },
        {
            name: 'employee',
            type: 'input',
            message: 'Enter employee ID',
        },
    ]).then((data) => {
        const query = `INSERT INTO employee (first_name, last_name, employee_id) VALUES ('${data.first}', '${data.last}', ${data.employee})`
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(query);
            start();
        });
    })
};

const addDept = () => {
    inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: 'Enter name of department',
        },
        {
            name: 'number',
            type: 'input',
            message: 'Enter department number',
        }
    ]).then((data) => {
        const query = `INSERT INTO department (department, id) VALUES ('${data.department}', ${data.number})`
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(query);
            start();
        });
    })
};

const addRole = () => {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter title of role',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter role salary',
        },
        {
            name: 'number',
            type: 'input',
            message: 'Enter role ID',
        }
    ]).then((data) => {
        const query = `INSERT INTO role (title, salary, role_id) VALUES ('${data.title}',${data.salary}, ${data.number})`
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(query);
            start();
        });
    })
};