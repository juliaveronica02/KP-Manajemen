import React, { Component } from 'react'
import DishServices from '../dishServices/dishServices';

class CreateDishService extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            imageURL: '',
            dishName: '',
            description: '',
            quantity: '',
        }
        this.changeimageURLHandler = this.changeimageURLHandler.bind(this);
        this.changedishNameHandler = this.changedishNameHandler.bind(this);
        this.changeddescriptionHandler = this.changeddescriptionHandler.bind(this);
        this.changedquantityHandler = this.changedquantityHandler.bind(this);
        this.saveOrUpdateDish = this.saveOrUpdateDish.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === ''){
            return
        }else{
            DishServices.getDishById(this.state.id).then( (res) =>{
                let dish = res.data;
                this.setState({dishName: dish.dishName,
                    imageURL: dish.imageURL,
                    description : dish.description,
                    quantity : dish.quantity,
                });
            });
        }        
    }
    saveOrUpdateDish = (e) => {
        e.preventDefault();
        let dish = {dishName: this.state.dishName, imageURL: this.state.imageURL, description: this.state.description, quantity: this.state.quantity};
        console.log('dish => ' + JSON.stringify(dish));

        // step 5
        if(this.state.id === ''){
            DishServices.createDish(dish).then(res =>{
                this.props.history.push('/inventory');
            });
        }else{
            DishServices.updateDish(dish, this.state.id).then( res => {
                this.props.history.push('/inventory');
            });
        }
    }
    
    changedishNameHandler= (event) => {
        this.setState({dishName: event.target.value});
    }

    changeimageURLHandler= (event) => {
        this.setState({imageURL: event.target.value});
    }

    changeddescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }
    changedquantityHandler= (event) => {
        this.setState({quantity: event.target.value});
    }

    cancel(){
        this.props.history.push('/inventory');
    }

    getTitle(){
        if(this.state.id === ''){
            return <h3 className="text-center">Add Dish</h3>
        }else{
            return <h3 className="text-center">Update Dish</h3>
        }
    }
    render() {
        return (
            <div style={{marginTop: "7rem"}}>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3 pt-4">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Dish Name: </label>
                                            <input placeholder="Dish Name" name="dishName" className="form-control" 
                                                value={this.state.dishName} onChange={this.changedishNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> imageURL: </label>
                                            <input placeholder=" Image URL" name="imageURL" className="form-control" 
                                                value={this.state.imageURL} onChange={this.changeimageURLHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Description: </label>
                                            <input placeholder="Email Address" name="description" className="form-control" 
                                                value={this.state.description} onChange={this.changeddescriptionHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Quantity: </label>
                                            <input placeholder="Email Address" name="description" className="form-control" 
                                                value={this.state.quantity} onChange={this.changedquantityHandler}/>
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

export default CreateDishService