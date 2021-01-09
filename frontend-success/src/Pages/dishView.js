// this is view dish component.
import React, { Component } from 'react'
import DishService from '../dishServices/dishServices'

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            dish: {}
        }
    }

    componentDidMount(){
        DishService.getDataById(this.state.id).then( res => {
            this.setState({dish: res.data});
        })
    }

    render() {
        return (
            <div style={{marginTop: "8rem"}}>
                <br></br>
                <div className = "card col-md-6 offset-md-3 pt-4">
                    <h3 className = "text-center"> View Dish Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Image URL &nbsp; &nbsp;: </label>
                            <div> &nbsp; { this.state.dish.imageURL }</div>
                        </div>
                        <div className = "row">
                            <label>  Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </label>
                            <div>&nbsp; { this.state.dish.dishName }</div>
                        </div>
                        <div className = "row">
                            <label> Description &nbsp;&nbsp;: </label>
                            <div> &nbsp; { this.state.dish.description }</div>
                        </div>
                        <div className = "row">
                            <label> Quantity &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </label>
                            <div> &nbsp;{ this.state.dish.quantity }</div>
                        </div>
                        <div className = "row">
                            <label> Unit &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </label>
                            <div> &nbsp;{ this.state.dish.unit }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent
