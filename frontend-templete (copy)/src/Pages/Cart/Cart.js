import React from 'react';
import { connect } from 'react-redux';
import { beli } from './../../action/cart'
import Swal from 'sweetalert2'

const Item = (props) => {
    const { cart } = props;

    const beli = () => {
        props.beli(cart.id, cart.name, cart.price, cart.imageUrl);
        Swal.fire(
            {
                icon: 'success',
                text: `item added to cart`
            }
        )
    }
    return (

            <button className="btn btn-outline-light btn-secondary" onClick={beli}>Add To Cart</button>

    )
}

const mapDispatchToProps = { beli }

export default connect(null, mapDispatchToProps)(Item);