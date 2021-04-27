import React from 'react';
import axios from 'axios';
<<<<<<< HEAD
import { NavLink } from 'react-router-dom';
=======
import { NavLink, Link } from 'react-router-dom';
import './index.css'
>>>>>>> dd7896478f0aaf18535ff29b4a73f8582df6b68e

class Product extends React.Component {
 // constructor(props) {
 //  super(props);
 //  this.state = {
 //   width: window.innerWidth,
 //   products: [],
 //  };
 // }
 state = {
  width: window.innerWidth,
  products: [],
 };

 componentDidMount() {
  console.log('token: ', localStorage.getItem('jwtToken'));
  axios
   .get('http://localhost:8000/dish/show', {
    headers: {
     'x-access-token': localStorage.getItem('jwtToken'),
     'Content-Type': 'application/json',
     Accept: 'application/json',
    },
   })
   .then((response) => {
    console.log('respon data: ', response);
    const products = response.data;
    if (products) {
     this.setState({ products: products });
    } else {
     this.setState({ products: [] });
    }
   })
   .catch((err) => {
    console.log('error', err);
   });
 }

 render() {
  // responsive.
  const { width, products } = this.state;
  const isMobile = width <= 500;
  const showData = products.map((listProduct) => {
   return (
    <div className="col-lg-3 col-md-6 mb-4" key={listProduct.id}>
     <div className="card">
      <div className="box">
       <img
        src={`http://localhost:8000/${listProduct.image}`}
        alt={listProduct.name}
        className="card-img-top"
        // height: '200px': optional, you can remove it.
        style={{ height: '200px', width: '100%', overflow:'hidden', objectFit: 'cover' }}
       />
      </div>
      <div className="card-body pt-0">
       <h5 className="mt-4 mb-3">{listProduct.name}</h5>
<<<<<<< HEAD
       <p className="text-ellipsis">
        <span
         className="text-concat"
         style={{
          position: 'relative',
          display: 'inline-bloc',
          wordWrap: 'break-word',
          overflow: 'hidden',
          maxHeight: '5.6em' /* (Number of lines you want visible) * (line-height) */,
          lineHeight: '1.2em',
          textAlign: 'justify',
         }}
        >
         {listProduct.description}
        </span>{' '}
       </p>
=======
       <p className="text-ellipsis"><span className="text-concat">{listProduct.description}</span> </p>
>>>>>>> dd7896478f0aaf18535ff29b4a73f8582df6b68e
       {/* if still have stock (quantity is number) the background color is blue, when out of stock will turn red and show "out of stock" text. */}
       <p>
        Remaining Stock:{' '}
        {listProduct.quantity > 0 ? (
         <span className={'badge bg-primary'}>{listProduct.quantity}</span>
        ) : (
         <span className={'badge bg-danger'}>Out Of Stock !!</span>
        )}{' '}
       </p>
       {/* <Link className="btn btn-primary mr-4" to={`/item/${listProduct.id}`}>
        Detail
       </Link> */}
      </div>
     </div>
    </div>
   );
  });

  if (isMobile) {
   return (
    <div className="container">
     <div className="row">
      {this.state.products.map((listProduct) => (
       <div className="col-12" key={listProduct.id}>
        <div style={imageStyle}>
         <NavLink to={`/details/detail/${listProduct.id}`}>
          <img style={slideStyles} src={listProduct.imageUrl} alt="lorem ipsum" />
         </NavLink>
         <small>{listProduct.product.dishName}</small>
         <h5>{listProduct.product.name}</h5>
         <small>{listProduct.description}</small>
         <h5>Rp.{listProduct.product.price},-</h5>
         <h6> {listProduct.date}</h6>
         <h6> 10:00 WIB</h6>
         <small> {listProduct.location}</small>
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
    <div className="row">{showData}</div>
   </div>
  );
 }
}

export default Product;

const slideStyles = {
 display: 'block',
 width: '100%',
 maxHeight: '360px',
 borderRadius: '8px',
};
const imageStyle = {
 display: 'block',
 margin: '15px',
 fontFamily: 'Barlow Semi Condensed',
};
