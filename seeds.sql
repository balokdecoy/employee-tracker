USE employeeDB;

INSERT INTO department (department)
VALUES 
('Engineering'),
('Legal'),
('Sales'),
('IT');

INSERT INTO role (title, salary, role_id)
VALUES
('Salesperson', 60000, 3),
('Counselor', 120000, 2),
('Engineer', 100000, 1),
('Technician', 80000, 4);

INSERT INTO employee (first_name, last_name, employee_id)
VALUES
('Johnnie', 'Simpson', 1),
('Amir', 'Ashtiany', 2),
('Frankie', 'Rosado', 3),
('Rachel', 'Wanke', 4),
('Young Ji', 'Kim', 2);