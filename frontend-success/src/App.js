import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar"
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/authToken";
import { setCurrentUser, logoutUser } from "./action/auth"
import { Provider } from "react-redux";
import store from "./store/store";
import Home from "./Pages/Home"
import signin from "./Components/signIn"
import signup from "./Components/signUp"
import CreateDish from './Pages/dishUpdate'  
import DishList from './Pages/dishList'  
import EditDish from "./Pages/dishView"; 

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
      </div>
    </Router>
    </Provider>
  );
}

export default App;
