import React, { Component } from 'react'
import DishServices from '../dishServices/dishServices';

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            dish: {}
        }
    }

    componentDidMount(){
        DishServices.getDishById(this.state.id).then( res => {
            this.setState({dish: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Dish Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Dish Name: </label>
                            <div> { this.state.dish.dishName }</div>
                        </div>
                        <div className = "row">
                            <label> Dish Image: </label>
                            <div> { this.state.dish.imageURL }</div>
                        </div>
                        <div className = "row">
                            <label> Description: </label>
                            <div> { this.state.dish.description }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent