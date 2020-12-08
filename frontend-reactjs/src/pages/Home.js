import React, { Component } from "react";
import Header from "../Components/Header/Header";
import Product from "../pages/Product";
import Footer from '../Components/Footer/Footer'

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Product />
        <Footer />
      </div>
    );
  }
}