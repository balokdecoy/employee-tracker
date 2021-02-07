USE employeeDB;

INSERT INTO department (department)
VALUES 
('Engineering'),
('Legal'),
('Sales'),
('IT');

INSERT INTO role (title, salary, department_id)
VALUES
('Salesperson', 60000, 3),
('Counselor', 120000, 2),
('Engineer', 100000, 1),
('Technician', 80000, 4);

INSERT INTO employee (first_name, last_name)
VALUES
('Johnnie', 'Simpson'),
('Amir', 'Ashtiany'),
('Frankie', 'Rosado'),
('Rachel', 'Wanke'),
('Young Ji', 'Kim');