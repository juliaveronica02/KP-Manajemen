import React from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";

class Product extends React.Component {
    constructor(props) {
      super();
      this.state = {
        width: window.innerWidth,
        products: [],
      };
    }
    componentDidMount() {
      console.log("token: ", localStorage.getItem("jwtToken"));
      axios
        .get(
          'http://localhost:8000/dish/show',
          {
            headers: {
              "x-access-token": localStorage.getItem("jwtToken"),
            },
          })
        .then((response) => {
          console.log("respon data: ",response.data);
          const products = response.data;
          this.setState({ products: products });
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  
    render() {
      // responsive.
      const { width } = this.state;
      const isMobile = width <= 500;
      const showData = this.state.products.map((listProduct) => {
        return (
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card" key={listProduct.id}>
              <div className="box">
                <img
                  src={listProduct.imageURL}
                  alt={listProduct.dishName}
                  className="card-img-top"
                  style={{ height: "200px", width: "100%" }}
                />
              </div>
              <div className="card-body pt-0">
              <h5>{listProduct.dishName}</h5>
                <p>{listProduct.description}</p>
                {/* if still have stock (quantity is number) the background color is blue, when out of stock will turn red and show "out of stock" text. */}
                <p>Remaining Stock : {listProduct.quantity ? <span className={'badge bg-primary'}>{listProduct.quantity} </span>:
                <span className={'badge bg-danger'}> Out Of Stock!!</span> } </p>
                <Link className="btn btn-primary mr-4" to={`/item/${listProduct.id}`}>
                  Detail
                </Link>
              </div>
            </div>
          </div>
        );
      })
      console.log("products: ", this.state.products);
      if (isMobile) {
        return (
          <div className="container">
            <div className="row">
              {this.state.products.map((listProduct) => (
                <div className="col-12" key={listProduct.id}>
                  <div style={imageStyle}>
                    <NavLink to={`/details/detail/${listProduct.id}`}>
                      <img
                        style={slideStyles}
                        src={listProduct.imageUrl}
                        alt = "lorem ipsum"
                      />
                    </NavLink>
                    <small>{listProduct.product.dishName}</small>
                    <h5>{listProduct.product.name}</h5>
                    <small>{listProduct.description}</small>
                    <h5>Rp.{listProduct.product.price},-</h5>
                    <h6>  {listProduct.date}</h6>
                    <h6>  10:00 WIB</h6>
                    <small>  {listProduct.location}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
      return (
        <div className="container pt-4 mb-4">
          <h3 className="text-center">Our Items</h3>
          <hr className="hr mb-4" />
          <div className="row">
            {showData}
          </div>
        </div>
      );
    }
  }
  
  export default Product;
  
  const slideStyles = {
    display: "block",
    width: "100%",
    maxHeight: "360px",
    borderRadius: "8px",
  };
  const container = {
    paddingRight: "0px",
    paddingLeft: "0px",
    marginLeft: "auto",
    marginRight: "auto",
  };
  const imageStyle = {
    display: "block",
    margin: "15px",
    fontFamily: "Barlow Semi Condensed",
  };