// this is view dish component.
// Importing React since we are using React.
import React, { Component } from 'react'
import StockService from '../../Services/dishStock'

class ViewStockComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            dish: {}
        }
    }

    componentDidMount(){
        StockService.getDataById(this.state.id).then( res => {
            this.setState({dish: res.data});
            console.log("data view stock", res.data);
        })
    }

    render() {
        return (
            <div style={{marginTop: "8rem"}}>
                <br></br>
                <div className = "card col-md-6 offset-md-3 pt-4">
                    <h3 className = "text-center"> View Stock Details</h3>
                    <div className = "card-body">
                    <div className = "row">
                            <label> Dish Id &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : </label>
                            <div> &nbsp;{ this.state.dish.dish_id }</div>
                        </div>
                        <div className = "row">
                            <label> Add Quantity &nbsp;&nbsp; : </label>
                            <div> &nbsp;{ this.state.dish.addQuantity }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewStockComponent