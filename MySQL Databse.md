## For Creating Databse
```
CREATE DATABASE BudgetPlanner

```

## For Creating Expense Table

```
CREATE TABLE expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    date DATE NOT NULL,
    expensename VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    paymode VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL
);

```
## For Creating Register Table

```
CREATE TABLE register (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

```

## for fetching the user details for profile page
```
SELECT username, email FROM register;

```