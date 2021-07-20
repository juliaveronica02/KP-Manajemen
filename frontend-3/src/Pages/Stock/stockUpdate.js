// this is add and update dish pages.
// Importing React since we are using React.
import React, { Component } from 'react'
import StockService from '../../Services/dishStock';

class CreateStockComponent extends Component {
    // in the constructor, we havae declared our state variables and bind the different methods so that they are accessible from the state inside of the render() method.
    constructor(props) {
        super(props)
        this.state = {
            // step 2. we retrieve dish id from the route using the following line of code.
            id: this.props.match.params.id,
            dish_id: '',
            quantity: '',
        }
        this.changedish_idHandler = this.changedish_idHandler.bind(this);
        this.changeQuantityHandler = this.changeQuantityHandler.bind(this);
        this.saveOrUpdateDish = this.saveOrUpdateDish.bind(this);
    }

    // step 3. the componentDidMount() is executed when the component is mounted for the first time.
    componentDidMount(){

        // step 4. in componentDidMount() method, if the id is "create" then we don't do anything else we retrieve dish by id using StockService.getDataById() method.
        if(this.state.id === 'create'){
            return
        }else{
            StockService.getDataById(this.state.id).then( (res) =>{
                let data = res.data;
                this.setState({
                    dish_id : data.dish_id,
                    quantity : data.quantity,
                });
            });
        }        
    }
    // save and update dish function.
    saveOrUpdateDish = (e) => {
        e.preventDefault();
        let dish = {dish_id: this.state.dish_id, quantity: this.state.quantity};
        console.log('dish => ' + JSON.stringify(dish));

        /*
            step 5.
            in the saveOrUpdateDish() method, we check if the id is "create" then we call StockService.create() method which
            internally makes a rest API call to store dish data into mysql database. if id is any positive number than we call
            StockService.updateDataById() method which internally makes a rest API call to store updated dish into mysql database.
        */
        if(this.state.id === 'create'){
            StockService.create(dish).then(res =>{
                this.props.history.push('/stock');
            });
        }else{
            StockService.updateDataById(dish, this.state.id).then( res => {
                this.props.history.push('/stock');
            });
        }
    }
    
    changedish_idHandler= (event) => {
        this.setState({dish_id: event.target.value});
    }
    changeQuantityHandler= (event) => {
        this.setState({quantity: event.target.value});
    }

    // on click on the cancel button, the cancel() method called and it will navigate the user to the dish list page.
    cancel(){
        this.props.history.push('/stock');
    }
    // we are using a getTitle method to get the title for Add and dish page based on id.
    getTitle(){
        if(this.state.id === 'create'){
            return <h3 className="text-center">Add Stock</h3>
        }else{
            return <h3 className="text-center">Update Stock</h3>
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
                                            <label> Dish ID: </label>
                                            <input placeholder="Dish ID" name="dish_id" className="form-control" 
                                                value={this.state.dish_id} onChange={this.changedish_idHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Quantity: </label>
                                            <input placeholder="Example: 20" name="quantity" className="form-control" 
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

export default CreateStockComponent