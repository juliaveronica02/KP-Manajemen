// Dish list.
import React, { Component } from 'react'
import DishService from '../dishServices/dishServices'
class ListEmployeeComponent extends Component {
    /*
    constructor() invoked before the component is mounted. in the constructor, we have declared our state variables and bind the different methods so that 
    they are accessible from the state insode of the render() method.
    */
    constructor(props) {
        super(props)

        this.state = {
                dishs: []
        }
        this.addDish = this.addDish.bind(this);
        this.editDish = this.editDish.bind(this);
        this.deleteDish = this.deleteDish.bind(this);
    }
    // on the click of delete button, we use filter() method of an array to filter out the deleted dish.
    deleteDish(id){
        DishService.deleteDataById(id).then( res => {
            this.setState({dishs: this.state.dishs.filter(dish => dish.id !== id)});
        });
    }
    // on the click of the view button, we will navigate to view dish page using the following code.
    viewDish(id){
        this.props.history.push(`/view-dish/${id}`);
    }
    // on the click of the update button, we will navigate to the update dish page using following code.
    editDish(id){
        this.props.history.push(`/add-dish/${id}`);
    }
    // componentDidMount() is executed when the component is mounted for the first time.
    // in the implementation,  it actually invokes the services class method to fetch the dish from an API calls and populates the state variable dishs.
    componentDidMount(){
        DishService.getAllData().then((res) => {
            this.setState({ dishs: res.data});
        });
    }

    addDish(){
        this.props.history.push('/add-dish/create');
    }

    render() {
        return (
            <div style={{marginTop:"8rem", padding: 180, paddingTop: 0}}>
                 <h2 className="text-center">Dish List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addDish}> Add Dish</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered text-center">

                            <thead>
                                <tr>
                                    <th> Image</th>
                                    <th> Name</th>
                                    <th> Quantity</th>
                                    <th> Unit</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* we are using the ES6 feature that is map operator to loop over our dish list and create the view. */}
                                {   
                                    this.state.dishs.map(
                                        dish => 
                                        <tr key = {dish.id}>
                                             <td> <img src={dish.imageURL} alt="images" style={{width: "100px"}} /></td>   
                                             <td> {dish.dishName}</td>
                                             <td> {dish.quantity}</td>
                                             <td> {dish.unit}</td>
                                             <td>
                                                 <button onClick={ () => this.editDish(dish.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteDish(dish.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewDish(dish.id)} className="btn btn-info">View </button>
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

export default ListEmployeeComponent