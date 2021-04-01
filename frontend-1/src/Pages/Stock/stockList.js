// Dish list.
// Importing React since we are using React.
import React, { Component } from 'react'
import StockService from '../../Services/dishStock'
// Import moment js library to format date in table.
import moment from 'moment';

class StockListComponent extends Component {
    /*
    constructor() invoked before the component is mounted. in the constructor, we have declared our state variables and bind the different methods so that 
    they are accessible from the state insode of the render() method.
    */
    constructor(props) {
        super(props)

        this.state = {
                stocks: []
        }
        this.addStock = this.addStock.bind(this);
        this.editStock = this.editStock.bind(this);
        this.deleteStock = this.deleteStock.bind(this);
    }
    // on the click of delete button, we use filter() method of an array to filter out the deleted dish stock.
    deleteStock(id){
        StockService.deleteDataById(id).then( res => {
            this.setState({stocks: this.state.stocks.filter(dish => dish.id !== id)});
        });
    }
    // on the click of the view button, we will navigate to view dish page using the following code.
    viewDish(id){
        this.props.history.push(`/view-stock/${id}`);
    }
    // on the click of the update button, we will navigate to the update dish page using following code.
    editStock(id){
        this.props.history.push(`/add-stock/${id}`);
    }
    // componentDidMount() is executed when the component is mounted for the first time.
    // in the implementation,  it actually invokes the services class method to fetch the dish from an API calls and populates the state variable stocks.
    componentDidMount(){
        StockService.getAllData().then((res) => {
            this.setState({ stocks: res.data});
        });
    }

    addStock(){
        this.props.history.push('/add-stock/create');
    }

    render() {
        return (
            <div style={{marginTop:"8rem", padding: 180, paddingTop: 0}}>
                 <h2 className="text-center">Stock List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addStock}> Add Stock</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered text-center">

                            <thead>
                                <tr>
                                    <th> dish_id</th>
                                    <th> Dish Name</th>
                                    <th> addQuantity</th>
                                    <th> Create Time</th>
                                    <th> Update Time</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* we are using the ES6 feature that is map operator to loop over our dish list and create the view. */}
                                {   
                                    this.state.stocks.map(
                                        stock => 
                                        <tr key = {stock.id}>
                                             <td> {stock.dish_id}</td>
                                             <td> {stock.dish.dishName}</td>
                                             <td> {stock.addQuantity}</td>
                                             <td> {moment(stock.createdAt).format('LLLL')}</td>
                                             <td> {moment(stock.updatedAt).format("LLLL")}</td>
                                             <td>
                                                 {/* <button onClick={ () => this.editStock(stock.id)} className="btn btn-info">Update </button> */}
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteStock(stock.id)} className="btn btn-danger">Delete </button>
                                                 {/* <button style={{marginLeft: "10px"}} onClick={ () => this.viewDish(stock.id)} className="btn btn-info">View </button> */}
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

export default StockListComponent