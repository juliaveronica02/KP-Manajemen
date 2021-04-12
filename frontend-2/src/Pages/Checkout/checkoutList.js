// Dish list.
// Importing React since we are using React.
import React, { Component } from 'react'
import CheckoutService from '../../Services/dishCheckout'
// Import moment js library to format date in table.
import moment from 'moment';

class CheckoutListComponent extends Component {
    /*
    constructor() invoked before the component is mounted. in the constructor, we have declared our state variables and bind the different methods so that 
    they are accessible from the state insode of the render() method.
    */
    constructor(props) {
        super(props)

        this.state = {
            checkouts: []
        }
        this.addCheckout = this.addCheckout.bind(this);
        this.editCheckout = this.editCheckout.bind(this);
        this.deleteCheckout = this.deleteCheckout.bind(this);
    }

    // on the click of delete button, we use filter() method of an array to filter out the deleted dish stock.
    deleteCheckout(id){
        CheckoutService.deleteDataById(id).then( res => {
            this.setState({checkouts: this.state.checkouts.filter(dish => dish.id !== id)});
        });
    }
    // on the click of the view button, we will navigate to view dish page using the following code.
    viewDish(id){
        this.props.history.push(`/view-checkout/${id}`);
    }
    // on the click of the update button, we will navigate to the update dish page using following code.
    editCheckout(id){
        this.props.history.push(`/add-checkout/${id}`);
    }
    // componentDidMount() is executed when the component is mounted for the first time.
    // in the implementation,  it actually invokes the services class method to fetch the dish from an API calls and populates the state variable checkouts.
    componentDidMount(){
        CheckoutService.getAllData().then((res) => {
            this.setState({ checkouts: res.data});
        });
    }

    addCheckout(){
        this.props.history.push('/add-checkout/create');
    }

    render() {
        return (
            <div style={{marginTop:"8rem", padding: 180, paddingTop: 0}}>
                 <h2 className="text-center">Checkout List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addCheckout}> Add Checkout Dish</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered text-center">

                            <thead>
                                <tr>
                                    <th> dish_id</th>
                                    <th> Dish Name</th>
                                    <th> Quantity</th>
                                    <th> Create Time</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* we are using the ES6 feature that is map operator to loop over our dish list and create the view. */}
                                {   
                                    this.state.checkouts.map(
                                        checkout => 
                                        <tr key = {checkout.id}>
                                             <td> {checkout.dish_id}</td>
                                             <td> {checkout.dish.name}</td>
                                             <td> {checkout.quantity}</td>
                                             <td> {moment(checkout.createdAt).format('LLLL')}</td>
                                             <td>
                                                 {/* <button onClick={ () => this.editCheckout(checkout.id)} className="btn btn-info">Update </button> */}
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCheckout(checkout.id)} className="btn btn-danger">Delete </button>
                                                 {/* <button style={{marginLeft: "10px"}} onClick={ () => this.viewDish(checkout.id)} className="btn btn-info">View </button> */}
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>
                 
            </div>
        )
    }
}

export default CheckoutListComponent