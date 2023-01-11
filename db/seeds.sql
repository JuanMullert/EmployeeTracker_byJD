INSERT INTO department (name)
VALUES ("Sales"),
       ("Human Resources"),
       ("Legal"),
       ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 90000, 1),
       ("Salesperson", 70000, 1),
       ("Trainer", 65000, 2),
       ("HR Compliance", 50000, 2),
       ("Lawyer", 100000, 3),
       ("Paralegal", 60000, 3),
       ("Senior Engineer", 190000, 4),
       ("Software Engineer", 112000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kenny", "Singh", 1, NULL),
       ("Janice", "Golden", 1, 1),
       ("Barrett", "Cannon", 2, NULL),
       ("Grant", "Morgan", 2, 2),
       ("Debbie", "Becker", 3, NULL),
       ("Emanuel", "Suarez", 3, 3),
       ("Taylor", "Raymond", 4, NULL),
       ("Marissa", "Peters", 4, 4);