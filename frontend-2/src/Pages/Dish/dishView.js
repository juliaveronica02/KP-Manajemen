// this is view dish component.
// Importing React since we are using React.
import React, { Component } from 'react'
import DishService from '../../Services/dishServices'

class ViewDishComponent extends Component {
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
            console.log("dish by id: ", res.data);
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
                            <div> &nbsp; { this.state.dish.image }</div>
                        </div>
                        <div className = "row">
                            <label>  Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </label>
                            <div>&nbsp; { this.state.dish.name }</div>
                        </div>
                        <div className = "row">
                            <label> Categories &nbsp;&nbsp;&nbsp;: </label>
                            <div> &nbsp; { this.state.dish.categories }</div>
                        </div>
                        <div className = "row">
                            <label> Description &nbsp;&nbsp;: </label>
                            <div> &nbsp; { this.state.dish.description }</div>
                        </div>
                        <div className = "row">
                            <label> Quantity &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </label>
                            <div> &nbsp; {this.state.dish.quantity > 0 ? <span className={'badge bg-primary'}>{this.state.dish.quantity}</span>:
                                                  <span className={'badge bg-danger'}>Out Of Stock !!</span> }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewDishComponent