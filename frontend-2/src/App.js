import React from "react";
// Configure react app routing.
import { HashRouter as Router, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar"
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/authToken";
import { setCurrentUser, logoutUser } from "./action/auth"
import { Provider } from "react-redux";
import store from "./store/store";
import Home from "./Pages/Home"
import Footer from "./Components/Footer/footer"
import signin from "./Components/Form/signIn"
import signup from "./Components/Form/signUp"
// ------- DISH -----------
import CreateDish from './Pages/Dish/dishUpdate'  
import DishList from './Pages/Dish/dishList'  
import EditDish from "./Pages/Dish/dishView"; 
// ------- END -----------

// ------- Stock -----------
import CreateStock from './Pages/Stock/stockUpdate'  
import StockList from './Pages/Stock/stockList'  
import ViewStock from "./Pages/Stock/stockView"; 
// ------- END -----------

// ------- Checkout -----------
import ListCheckout from './Pages/Checkout/checkoutList'  
import CreateCheckout from './Pages/Checkout/checkoutUpdate'  
// ------- END -----------

// ------- Invoice ----------
import ListInvoice from "./Pages/Invoice/list"
import CreateInvoice from "./Pages/Invoice/createUpdate"
import ViewInvoice from "./Pages/Invoice/view"

// Check for token to keep user logged in.
if (localStorage.jwtToken) {
  // Set auth token header auth.
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp.
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated.
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token.
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user.
    store.dispatch(logoutUser());
    // Redirect to login.
    window.location.href = "./signin";
  }
}

function App() {
  return (
    <Provider store={store}>
    <Router>
      <div>
        <Navbar/>
      </div>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={signin} />
        <Route exact path="/signup" component={signup} />
        <Route path = "/dish" component = {DishList}></Route>
        <Route path = "/add-dish/:id" component = {CreateDish}></Route>
        <Route path = "/view-dish/:id" component = {EditDish}></Route>
        <Route path = "/stock" component = {StockList}></Route>
        <Route path = "/add-stock/:id" component = {CreateStock}></Route>
        <Route path = "/view-stock/:id" component = {ViewStock}></Route>
        <Route path = "/checkout" component = {ListCheckout}></Route>
        <Route path = "/add-checkout/:id" component = {CreateCheckout}></Route>
        <Route path = "/invoice" component = {ListInvoice}></Route>
        <Route path = "/add-invoice/:id" component = {CreateInvoice}></Route>
        <Route path = "/view-invoice/:id" component = {ViewInvoice}></Route>

      </div>
      <Footer />
    </Router>
    </Provider>
  );
}

export default App;
