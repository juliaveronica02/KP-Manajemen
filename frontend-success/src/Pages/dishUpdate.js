// this is add and update dish pages.
import React, { Component } from 'react'
import DishService from '../dishServices/dishServices';

class CreateEmployeeComponent extends Component {
    // in the constructor, we havae declared our state variables and bind the different methods so that they are accessible from the state inside of the render() method.
    constructor(props) {
        super(props)
        this.state = {
            // step 2. we retrieve dish id from the route using the following line of code.
            id: this.props.match.params.id,
            imageURL: '',
            dishName: '',
            description: '',
            quantity: '',
            unit: '',
        }
        this.changeimageURLHandler = this.changeimageURLHandler.bind(this);
        this.changedishNameHandler = this.changedishNameHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeQuantityHandler = this.changeQuantityHandler.bind(this);
        this.saveOrUpdateDish = this.saveOrUpdateDish.bind(this);
    }

    // step 3. the componentDidMount() is executed when the component is mounted for the first time.
    componentDidMount(){

        // step 4. in componentDidMount() method, if the id is "create" then we don't do anything else we retrieve dish by id using DishService.getDataById() method.
        if(this.state.id === 'create'){
            return
        }else{
            DishService.getDataById(this.state.id).then( (res) =>{
                let data = res.data;
                this.setState({imageURL: data.imageURL,
                    dishName: data.dishName,
                    description : data.description,
                    quantity : data.quantity,
                    unit: data.unit
                });
            });
        }        
    }
    // save and update dish function.
    saveOrUpdateDish = (e) => {
        e.preventDefault();
        let dish = {imageURL: this.state.imageURL, dishName: this.state.dishName, description: this.state.description, quantity: this.state.quantity, unit: this.state.unit};
        console.log('dish => ' + JSON.stringify(dish));

        /*
            step 5.
            in the saveOrUpdateDish() method, we check if the id is "create" then we call DishService.create() method which
            internally makes a rest API call to store dish data into mysql database. if id is any positive number than we call
            DishService.updateDataById() method which internally makes a rest API call to store updated dish into mysql database.
        */
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
    changeUnitHandler= (event) => {
        this.setState({unit: event.target.value});
    }
    // on click on the cancel button, the cancel() method called and it will navigate the user to the dish list page.
    cancel(){
        this.props.history.push('/dish');
    }
    // we are using a getTitle method to get the title for Add and dish page based on id.
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
                                            <label> ImageURL: </label>
                                            <input placeholder="Enter Image Link..." name="imageURL" className="form-control" 
                                                value={this.state.imageURL} onChange={this.changeimageURLHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Dish Name: </label>
                                            <input placeholder=" Name" name="dishName" className="form-control" 
                                                value={this.state.dishName} onChange={this.changedishNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Description: </label>
                                            <input placeholder="Dish Description" name="description" className="form-control" 
                                                value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Quantity: </label>
                                            <input placeholder="Example: 20" name="quantity" className="form-control" 
                                                value={this.state.quantity} onChange={this.changeQuantityHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Unit: </label>
                                            <input placeholder="Example: Kg, pcs, etc." name="unit" className="form-control" 
                                                value={this.state.unit} onChange={this.changeUnitHandler}/>
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