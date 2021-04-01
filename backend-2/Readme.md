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

