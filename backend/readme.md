## Install dependency.
npm i mysql2@2.1.0 sequelize@5.21.7 multer bcrypt cors body-parser multer-sharp-resizer

## Init project.
sequelize init.

## config folder.
change config.json file on folder config.

## create user table.
CREATE TABLE User( id int(11) NOT NULL AUTO_INCREMENT,username varchar(70) NOT NULL, email varchar(70) NOT NULL,password text NOT NULL,phone BIGINT(15) NOT NULL,createdAt datetime NOT NULL,updatedAt datetime NOT NULL,PRIMARY KEY(id));

## create dish table.
CREATE TABLE Dish( id int(11) NOT NULL AUTO_INCREMENT,dishName varchar(70) NOT NULL, imageURL text NOT NULL,description text NOT NULL,quantity BIGINT(15) NOT NULL,createdAt datetime NOT NULL,updatedAt datetime NOT NULL,PRIMARY KEY(id));

## Port running.
port 8000.

## Run.
nodemon start.