import React, { Component } from "react";
import Header from "../Components/Header/Header";
import Product from "../Pages/Product/Product";
// import Footer from "../components/Footer";
export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Product />
        {/* <Footer /> */}
      </div>
    );
  }
}
