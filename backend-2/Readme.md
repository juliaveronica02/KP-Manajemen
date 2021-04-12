## Template for writing api and database documentation.
<details>
<summary></summary>
</details>

## NPM (node package module).
npm i bcrypt mysql2 jsonwebtoken sequelize cors body-parser.

## Initialize sequelize.
after npm i, run "sequelize init".

## Setup config folder which have file.
## Setup .sequelizerc.
## Setup database and table.
* create database collab2;
* use collab2;
<details>
<summary>User</summary>
CREATE TABLE User(id int(11) NOT NULL AUTO_INCREMENT,username varchar(70) NOT NULL,email varchar(70) NOT NULL,password text NOT NULL,phone BIGINT(15) NOT NULL,image text NOT NULL,createdAt datetime NOT NULL,updatedAt datetime NOT NULL,PRIMARY KEY(id));
</details>

<details>
<summary>Category</summary>
CREATE TABLE Category(id int(11) NOT NULL AUTO_INCREMENT,name text NOT NULL,createdAt datetime NOT NULL,updatedAt datetime NOT NULL,PRIMARY KEY(id));
</details>

<details>
<summary>Dish</summary>
CREATE TABLE Dish(id int(11) NOT NULL AUTO_INCREMENT,image text NOT NULL,description text NOT NULL,name text NOT NULL,category_id int(11) NOT NULL,quantity int(11) NOT NULL,createdAt datetime NOT NULL,updatedAt datetime NOT NULL,PRIMARY KEY(id));
</details>

<details>
<summary>Add Stock</summary>
CREATE TABLE add_stock(id int(11) NOT NULL AUTO_INCREMENT,dish_id int(11) NOT NULL,quantity int(11) NOT NULL,createdAt datetime NOT NULL,updatedAt datetime NOT NULL,PRIMARY KEY(id));
</details>

<details>
<summary>Reduce Stock</summary>
CREATE TABLE reduce_stock(id int(11) NOT NULL AUTO_INCREMENT,dish_id int(11) NOT NULL,quantity int(11) NOT NULL,createdAt datetime NOT NULL,updatedAt datetime NOT NULL,PRIMARY KEY(id));
</details>

<details>
<summary>Trigger Add Stock</summary>
CREATE TRIGGER `addStock` BEFORE INSERT ON `add_stock` FOR EACH ROW BEGIN IF NOT EXISTS (SELECT * FROM Dish WHERE id = NEW.dish_id) THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ID Product Not Found'; ELSE UPDATE Dish SET quantity = NEW.quantity + quantity WHERE id = NEW.dish_id; END IF; END
</details>

<details>
<summary>Trigger Reduce Stock</summary>
CREATE TRIGGER `checkoutStock` AFTER INSERT ON `reduce_stock` FOR EACH ROW UPDATE Dish SET quantity = Dish.quantity - NEW.quantity WHERE id = NEW.dish_id;
</details>

<details>
<summary>Invoice</summary>
CREATE TABLE Invoice(id int(11) NOT NULL AUTO_INCREMENT,image text NOT NULL,store_name varchar(70) NOT NULL,sales_name varchar(70) NOT NULL,address text NOT NULL,phone BIGINT(15) NOT NULL,price BIGINT(20) NOT NULL,description text NOT NULL,createdAt datetime NOT NULL,updatedAt datetime NOT NULL,PRIMARY KEY(id));
</details>