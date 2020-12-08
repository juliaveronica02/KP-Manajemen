import React from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import NumberFormat from 'react-number-format'
import { connect } from "react-redux";
import Swal from "sweetalert2";

class Product extends React.Component {
  constructor(props) {
    super();
    this.state = {
      width: window.innerWidth,
      products: [],
    };
  }
  componentDidMount() {
    console.log(localStorage.getItem("jwtToken"));
    axios
      .get(
        `${process.env.REACT_APP_API_URL_ITEM}`,
        {
          headers: {
            "x-access-token": localStorage.getItem("jwtToken"),
          },
        })
      .then((response) => {
        console.log(response.data);

        const products = response.data;
        this.setState({ products: products });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  test = () => {
    Swal.fire({
      icon: 'warning',
      text: 'You must be logged in'
    })
  }
  
  render() {
    const { width } = this.state;
    const isMobile = width <= 500;
    const showData = this.state.products.map((listProduct) => {
      return (
        
        <div className="col-lg-3 col-md-6 mb-4">
        <div className="card" key={listProduct.id}>
          <div className="box">
            <img
              src={`https://api.juliaveronica.com/${listProduct.imageUrl}`}
              // src={require(`https://api.juliaveronica.com/${item.imageUrl}`)}
              alt={listProduct.name}
              className="card-img-top"
              style={{ height: "200px", width: "100%" }}
            />
          </div>
          <div className="card-body pt-0">
            <h5>{listProduct.name}</h5>
            <p>Remaining Stock : {listProduct.quantity}</p>
            <p>
              <NumberFormat
                value={listProduct.price}
                displayType="text"
                thousandSeparator={true}
                prefix={"Rp "}
              />
            </p>
          </div>
          <div className="card-footer d-flex flex-row justify-content-center">
            <Link
              className="btn btn-primary mr-4"
              to={`/item/${listProduct.id}`}
            >
              Detail
            </Link>
          </div>
        </div>
      </div>
    );
  });
  console.log(this.state.products);
  if (isMobile) {
    return (
      <div className="container">
        <div className="row">
          {this.state.products.map((listProduct) => (
            <div className="col-12" key={listProduct.id}>
              <div style={imageStyle}>
                <NavLink to={`/item/${listProduct.id}`}>
                  <img
                    style={slideStyles}
                    src={`${process.env.REACT_APP_API_URL_SERVER}/${listProduct.imageUrl}`}
                    alt="Lorem ipsum"
                  />
                </NavLink>
                <small>{listProduct.name}</small>
                <h5>{listProduct.name}</h5>
                <small>{listProduct.description}</small>
                <h5>                
                  <NumberFormat
                    value={listProduct.price}
                    displayType="text"
                    thousandSeparator={true}
                    prefix={"Rp "}
                  /></h5>
                <Link
                  className="btn btn-primary mr-4"
                  to={`/item/${listProduct.id}`}
                >
                  Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
    // return (
    //   <div className="container">
    //     <div class="row">
    //       {this.state &&
    //         this.state.products &&
    //         this.state.products.map((listProduct) => (
    //           <div className="col-3" key={listProduct.id}>
    //             <div style={imageStyle}>
    //               <NavLink to={`/details/detail/${listProduct.id}`}>
    //                 <img
    //                   style={slideStyles}
    //                   src={`${process.env.REACT_APP_API_URL}${listProduct.imageUrl}`}
    //                   alt="Lorem ipsum"
    //                 />
    //               </NavLink>
    //               <small>{listProduct.name}</small>
    //               <h5>{listProduct.name}</h5>
    //               <h5>Rp.{listProduct.price},-</h5>
    //             </div>
    //           </div>
    //         ))}
    //     </div>
    //   </div>
    // );
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
const mapDispatchToProps = (dispatch) => {
  return {
    // beli,
  };
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps,mapDispatchToProps)(Product)

const slideStyles = {
  display: "block",
  width: "100%",
  maxHeight: "360px",
  borderRadius: "8px",
};
const imageStyle = {
  display: "block",
  margin: "15px",
  fontFamily: "Barlow Semi Condensed",
};