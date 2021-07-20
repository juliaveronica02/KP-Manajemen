// Dish list.
// Importing React since we are using React.
import React, { Component } from 'react'
import InvoiceService from '../../Services/invoices'
// to format price in table.
import NumberFormat from 'react-number-format'

class ListDishComponent extends Component {
    /*
    constructor() invoked before the component is mounted. in the constructor, 
    we have declared our state variables and bind the different methods. so that,
    they are accessible from the state insode of the render() method.
    */
    constructor(props) {
        super(props)

        this.state = {
                invoice: []
        }
        this.addInvoice = this.addInvoice.bind(this);
        this.editInvoice = this.editInvoice.bind(this);
        this.deleteInvoice = this.deleteInvoice.bind(this);
    }
    // on the click of delete button, we use filter() method of an array to filter out the deleted dish.
    deleteInvoice(id){
        InvoiceService.deleteDataById(id).then( res => {
            this.setState({invoice: this.state.invoice.filter(dish => dish.id !== id)});
        });
    }
    // on the click of the view button, we will navigate to view dish page using the following code.
    viewDish(id){
        this.props.history.push(`/view-invoice/${id}`);
    }
    // on the click of the update button, we will navigate to the update dish page using following code.
    editInvoice(id){
        this.props.history.push(`/add-invoice/${id}`);
    }
    // componentDidMount() is executed when the component is mounted for the first time.
    // in the implementation,  it actually invokes the services class method to fetch the dish from an API calls and populates the state variable invoice.
    componentDidMount(){
        InvoiceService.getAllData().then((res) => {
            this.setState({ invoice: res.data});
        });
    }

    addInvoice(){
        this.props.history.push('/add-invoice/create');
    }

    render() {
        return (
            <div style={{marginTop:"8rem", padding: 180, paddingTop: 0}}>
                 <h2 className="text-center">Invoice List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addInvoice}> Add Invoice</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered text-center">

                            <thead>
                                <tr>
                                    <th> Image</th>
                                    <th> price</th>
                                    <th> store_name</th>
                                    <th> sales_name</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* we are using the ES6 feature that is map operator to loop over our dish list and create the view. */}
                                {   
                                    this.state.invoice.map(
                                        invoices => 
                                        <tr key = {invoices.id}>
                                             <td><img src={`http://localhost:8000/${invoices.image}`} alt="images" style={{width: "100px"}} /></td>   
                                             <td> <NumberFormat value={invoices.price} displayType="text" thousandSeparator={true} prefix={"Rp "} /></td>
                                             <td style={{ textTransform: 'capitalize'}}> {invoices.store_name}</td>
                                             <td> {invoices.sales_name} </td>
                                             <td>
                                                 {/* <button onClick={ () => this.editInvoice(invoices.id)} className="btn btn-info">Update </button> */}
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteInvoice(invoices.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewDish(invoices.id)} className="btn btn-info">View </button>
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

export default ListDishComponent