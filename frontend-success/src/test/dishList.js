import React, { Component } from 'react'
import DishServices from '../dishServices/dishServices'

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                dish: []
        }
        this.addDish = this.addDish.bind(this);
        this.editDish = this.editDish.bind(this);
        this.deleteDish = this.deleteDish.bind(this);
    }

    deleteDish(id){
        DishServices.deleteDish(id).then( res => {
            this.setState({dish: this.state.dish.filter(dish => dish.id !== id)});
        });
    }
    viewDish(id){
        this.props.history.push(`/show/${id}`);
    }
    editDish(id){
        this.props.history.push(`/edit/${id}`);
    }

    componentDidMount(){
        DishServices.getDish().then((res) => {
            this.setState({ dish: res.data});
        });
    }

    addDish(){
        this.props.history.push('/create');
    }

    render() {
        return (
            <div style={{marginTop: "8rem"}}>
                 <h2 className="text-center">Dish List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addDish}> Add Dish</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Image</th>
                                    <th> Name</th>
                                    <th> Quantity</th>
                                    <th> Description</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.dish.map(
                                        dish => 
                                        <tr key = {dish.id}>
                                             <td> { dish.imageURL} </td>   
                                             <td> {dish.dishName}</td>
                                             <td> {dish.quantity}</td>
                                             <td> {dish.description}</td>
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