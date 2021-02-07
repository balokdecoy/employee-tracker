const mysql = require('mysql');
const inquirer = require('inquirer');

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
            'This is a test',
            'This is a test 2',
            'This is a test 3',
        ]
    }).then((data) => {
        switch(data.action) {
            case 'This is a test':
                console.log('it works!');
                break;
            
            case 'This is a test 2':
                console.log('this also works');
                break;

            case 'This is a test 3':
                console.log('You are good to go');
                break
        }
    })
};