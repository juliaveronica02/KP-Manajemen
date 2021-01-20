## Inventory Management Systems.
Inventory Management Systems APP is using API that allow the users to read product and category information data from database. Also allow users to read, create, update and delete a product and its category information into/from database.

## Technology.
* MERN Stack (MYSQL, Express.js, React.js, Node.js).
* Backend
  - Express.
  - MySQL.
  - Sequelize.
  - Json Web Token (For authentication).
  - bcrypt (for data encryption).
  - CORS.
* Frontend.
  - React JS.
  - Redux (Manage app state).
  - React-router (To handle routing).
  - Axios (For http requests).
  - react-bootstrap.
  - react-burger-menu.
  - sweetalert2 (To handle success and error messages).

## Testing API/Routes.
* Postman.

## Key Concepts.
* MVC (Model-View-Controller).
* CRUD operations.
* Authentication system.
* Encrypting passwords.
* OOP (Object Oriented Programming).

## Clone.
* git clone https://github.com/juliaveronica02/KP-Manajemen.git.
* cd backend.
* npm i.
* cd ..
* cd frontend-success.
* npm i.

## RUN.
* cd backend: nodemon start.
* cd frontend-success: sudo npm start.

# Project Features.
## SignIn / Login.
* Everyone is registered as a user.
* Users when visit website only can see signup and login in navbar.
* First, all users must signup / register.
* after signup / register, users login.
* when login success, users will get token.

## Product life cycle.
* After login, at navbar users can see inventory, stock, checkout and logout.
* users can CRUD at Inventory.
* users can CRD at stock and checkout.
* stock (add stock).
* checkout: for minus the stock if we use.
* inventory quantity will auto increment and decrement during create stock or checkout.

## Other facilities.
* Users can logout.


@author: Julia Veronica-1931154-4PSIA