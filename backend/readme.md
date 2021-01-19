## Install dependency.
npm i mysql2@2.1.0 sequelize@5.21.7 multer bcrypt cors body-parser multer-sharp-resizer

## Init project.
sequelize init.

## config folder.
change config.json file on folder config.

# Setup Database on Mysql Terminal.
## Create database.
create database collab; <br>
use collab;
## create user table.
CREATE TABLE User( 
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(70) NOT NULL, 
  email varchar(70) NOT NULL,
  password text NOT NULL,
  phone BIGINT(15) NOT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY(id)
);

## create dish table.
CREATE TABLE Dish (
    id int(11) NOT NULL AUTO_INCREMENT,
    dishName VARCHAR(255),
    description text NOT NULL,
    imageURL text NOT NULL,
    quantity BIGINT(15),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

## create stock table.
CREATE TABLE Stock (
    id int(11) NOT NULL AUTO_INCREMENT,
    dish_id int(11),
    addQuantity BIGINT(15),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);
## create checkout table.
CREATE TABLE checkout (
    id int(11) NOT NULL AUTO_INCREMENT,
    dish_id int(11),
    quantity BIGINT(15),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

# Create trigger on mysql workbench.
## create trigger add_stock.
* Step by Step:
   1. open mysql workbench on ubuntu.
   2. select database.
   3. select Stock table - right click on mouse - choose alter table.
   4. Select triggers - before insert - right click on mouse - add new triggers.
   5. paste below code to mysql workbench triggers - press apply.
```
CREATE DEFINER=`root`@`localhost` TRIGGER `collab`.`add_Stock` BEFORE INSERT ON `Stock` FOR EACH ROW
BEGIN
IF NOT EXISTS (SELECT * FROM Dish WHERE id = NEW.dish_id) THEN
    	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ID Product Not Found';
    ELSE
    	UPDATE Dish SET quantity = NEW.addQuantity + quantity WHERE id = NEW.dish_id;
    END IF;
END
```
   6. pop up review the sql script to be applied on the database - press apply - close. 

## create trigger reduces_stock.
```
CREATE DEFINER = CURRENT_USER TRIGGER `collab`.`reduces_stock` AFTER INSERT ON `checkout` FOR EACH ROW
BEGIN
	UPDATE Dish SET quantity = Dish.quantity - NEW.quantity
        WHERE id = NEW.dish_id;
END
```
## Port running.
port 8000.

## Run.
nodemon start.
## Config mysql local.
{
  "development": {
    "username": "root", 
    "password": "Hallo123$",
    "database": "collab",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}