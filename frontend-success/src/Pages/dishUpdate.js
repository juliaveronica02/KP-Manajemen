import React, { Component } from 'react'
import DishService from '../dishServices/dishServices';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            imageURL: '',
            dishName: '',
            description: '',
            quantity: ''
        }
        this.changeimageURLHandler = this.changeimageURLHandler.bind(this);
        this.changedishNameHandler = this.changedishNameHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeQuantityHandler = this.changeQuantityHandler.bind(this);
        this.saveOrUpdateDish = this.saveOrUpdateDish.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === 'create'){
            return
        }else{
            DishService.getDataById(this.state.id).then( (res) =>{
                let data = res.data;
                this.setState({imageURL: data.imageURL,
                    dishName: data.dishName,
                    description : data.description,
                    quantity : data.quantity
                });
            });
        }        
    }
    saveOrUpdateDish = (e) => {
        e.preventDefault();
        let dish = {imageURL: this.state.imageURL, dishName: this.state.dishName, description: this.state.description, quantity: this.state.quantity};
        console.log('dish => ' + JSON.stringify(dish));

        // step 5
        if(this.state.id === 'create'){
            DishService.create(dish).then(res =>{
                this.props.history.push('/dish');
            });
        }else{
            DishService.updateDataById(dish, this.state.id).then( res => {
                this.props.history.push('/dish');
            });
        }
    }
    
    changeimageURLHandler= (event) => {
        this.setState({imageURL: event.target.value});
    }

    changedishNameHandler= (event) => {
        this.setState({dishName: event.target.value});
    }

    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }
    changeQuantityHandler= (event) => {
        this.setState({quantity: event.target.value});
    }

    cancel(){
        this.props.history.push('/dish');
    }

    getTitle(){
        if(this.state.id === 'create'){
            return <h3 className="text-center">Add Dish</h3>
        }else{
            return <h3 className="text-center">Update Dish</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container" style={{marginTop:"8rem"}}>
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3 pt-4">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="imageURL" className="form-control" 
                                                value={this.state.imageURL} onChange={this.changeimageURLHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="dishName" className="form-control" 
                                                value={this.state.dishName} onChange={this.changedishNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="description" className="form-control" 
                                                value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="quantity" className="form-control" 
                                                value={this.state.quantity} onChange={this.changeQuantityHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateDish}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent