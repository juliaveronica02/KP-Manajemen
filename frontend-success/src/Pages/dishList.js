import React, { Component } from 'react'
import DishService from '../dishServices/dishServices'

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                dishs: []
        }
        this.addDish = this.addDish.bind(this);
        this.editDish = this.editDish.bind(this);
        this.deleteDish = this.deleteDish.bind(this);
    }

    deleteDish(id){
        DishService.deleteDataById(id).then( res => {
            this.setState({dishs: this.state.dishs.filter(dish => dish.id !== id)});
        });
    }
    viewDish(id){
        this.props.history.push(`/view-dish/${id}`);
    }
    editDish(id){
        this.props.history.push(`/add-dish/${id}`);
    }

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
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Employee First Name</th>
                                    <th> Employee Last Name</th>
                                    <th> Employee Email Id</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.dishs.map(
                                        dish => 
                                        <tr key = {dish.id}>
                                             <td> <img src={dish.imageURL} alt="images" /></td>   
                                             <td> {dish.dishName}</td>
                                             <td> {dish.quantity}</td>
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