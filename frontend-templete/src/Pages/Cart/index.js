import React, { useEffect, useState }  from 'react';
import { connect } from 'react-redux';
import localforage from 'localforage';
// import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios';
import './cart.scss';

const Index = (props) => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        localforage.getItem('keranjang')
            .then( (data) => {
                setData(data || [])
            }
                )
    },  [])

    const checkout = () => {
        axios.post('https://api.juliaveronica.com/order/create', { pembelian : data })
            .then((response) => {
                setData([]);
                localforage.setItem('keranjang', []);
                Swal.fire("Thank You, The Next Feature is Still Coming Soon")
            })
    }
    // const URL = `${process.env.REACT_APP_API_URL_SERVER}`;

    
    return (
        <div className="mt-5 pt-5 text-center checkout">
      <section>
        <div className="row">
          <div className="col-lg-8">
            <div className="card wish-list mb-3">
              <div className="card-body">
                <h5 className="mb-4">Cart (<span>2</span> items)</h5>
                <div className="row mb-4">
                    
                  <div className="col-md-5 col-lg-3 col-xl-3">
                    <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                      <img className="img-fluid w-100" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg" alt="Sample" />
                      <a href="#!">
                        <div className="mask waves-effect waves-light">
                          <img className="img-fluid w-100" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12.jpg" alt="sample2" />
                          <div className="mask rgba-black-slight waves-effect waves-light" />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-7 col-lg-9 col-xl-9">
                    <div>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5>Blue denim shirt</h5>
                          <p className="mb-3 text-muted text-uppercase small">Shirt - blue</p>
                          <p className="mb-2 text-muted text-uppercase small">Color: blue</p>
                          <p className="mb-3 text-muted text-uppercase small">Size: M</p>
                        </div>
                        <div>
                          <div className="def-number-input number-input safari_only mb-0 w-100">
                            <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()" className="minus" />
                            <input className="quantity" min={0} name="quantity" defaultValue={1} type="number" />
                            <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" className="plus" />
                          </div>
                          <small id="passwordHelpBlock" className="form-text text-muted text-center">
                            (Note, 1 piece)
                          </small>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <a href="#!" type="button" className="card-link-secondary small text-uppercase mr-3"><i className="fas fa-trash-alt mr-1" /> Remove item </a>
                          <a href="#!" type="button" className="card-link-secondary small text-uppercase"><i className="fas fa-heart mr-1" /> Move to wish list </a>
                        </div>
                        <p className="mb-0"><span><strong>Rp. 150.000</strong></span></p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="mb-4" />
                <div className="row mb-4">
                  <div className="col-md-5 col-lg-3 col-xl-3">
                    <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                      <img className="img-fluid w-100" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13a.jpg" alt="Sample" />
                      <a href="#!">
                        <div className="mask waves-effect waves-light">
                          <img className="img-fluid w-100" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13.jpg" alt="sample3" />
                          <div className="mask rgba-black-slight waves-effect waves-light" />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-7 col-lg-9 col-xl-9">
                    <div>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5>Red hoodie</h5>
                          <p className="mb-3 text-muted text-uppercase small">Shirt - red</p>
                          <p className="mb-2 text-muted text-uppercase small">Color: red</p>
                          <p className="mb-3 text-muted text-uppercase small">Size: M</p>
                        </div>
                        <div>
                          <div className="def-number-input number-input safari_only mb-0 w-100">
                            <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()" className="minus" />
                            <input className="quantity" min={0} name="quantity" defaultValue={1} type="number" />
                            <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" className="plus" />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <a href="#!" type="button" className="card-link-secondary small text-uppercase mr-3"><i className="fas fa-trash-alt mr-1" /> Remove item </a>
                          <a href="#!" type="button" className="card-link-secondary small text-uppercase"><i className="fas fa-heart mr-1" /> Move to wish list </a>
                        </div>
                        <p className="mb-0"><span><strong>Rp. 200.000</strong></span></p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-primary mb-0"><i className="fas fa-info-circle mr-1" /> Do not delay the purchase, adding
                  items to your cart does not mean booking them.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="mb-3">Checkout items</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Total Amount
                    <span>Rp. 350.000</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>Free</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total Price of items</strong>
                    </div>
                    <span><strong>Rp. 600.000</strong></span>
                  </li>
                </ul>
                <button type="button" className="btn btn-primary btn-block waves-effect waves-light" onClick={checkout}>Checkout</button>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <a className="dark-grey-text d-flex justify-content-between" data-toggle="collapse" href="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1">
                  Add a discount code (optional)
                  <span><i className="fas fa-chevron-down pt-1" /></span>
                </a>
                <div className="collapse" id="collapseExample1">
                  <div className="mt-3">
                    <div className="md-form md-outline mb-0">
                      <input type="text" id="discount-code1" className="form-control font-weight-light" placeholder="Enter discount code" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        data: state.keranjang
    }
}

export default connect(mapStateToProps)(Index);