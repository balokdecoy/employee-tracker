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
    "SELECT employee.last_name, employee.first_name, role.title, department.department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id JOIN department on role.department_id = department.id";
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
    "SELECT role.title, role.salary, department.department FROM role LEFT JOIN department on role.department_id = department.id"
    connection.query(query, (err, res) => {
        console.table(res);
        start();
    });
};

const addEmployee = () => {
    const roleChoices = [];
    const query = 'SELECT role.id, role.title FROM role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            roleChoices.push({ name: res[i].title, value: res[i].id })
        };
    })
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
            name: 'role',
            type: 'rawlist',
            message: 'Select employee role',
            choices: roleChoices,
        },
    ]).then((data) => {
        const query = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${data.first}', '${data.last}', ${data.role})`
        connection.query(query, (err, res) => {
            if (err) throw err;
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
    ]).then((data) => {
        const query = `INSERT INTO department (department) VALUES ('${data.department}')`
        connection.query(query, (err, res) => {
            if (err) throw err;
            start();
        });
    })
};

const addRole = () => {
    const deptChoices = [];
    const query = 'SELECT department.id, department.department FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            deptChoices.push({ name: res[i].department, value: res[i].id });
        };
    })
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
            name: 'department',
            type: 'rawlist',
            message: 'Select a department for this role',
            choices: deptChoices,
        },
    ]).then((data) => {
        const query = `INSERT INTO role (title, salary, department_id) VALUES ('${data.title}',${data.salary}, ${data.department})`
        connection.query(query, (err, res) => {
            if (err) throw err;
            start();
        });
    })
};

const updateRole = () => {
    // Need new role name and id, set role_id = ? where id = employee no. 
    //UPDATE employee SET role_id = ? WHERE employee.id = ?
}