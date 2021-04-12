// this is add and update dish pages.
// Importing React since we are using React.
import React, { Component } from 'react'
import DishService from '../../Services/dishServices';

class CreateDishComponent extends Component {
    // in the constructor, we havae declared our state variables and bind the different methods so that they are accessible from the state inside of the render() method.
    constructor(props) {
        super(props)
        this.state = {
            // step 2. we retrieve dish id from the route using the following line of code.
            id: this.props.match.params.id,
            image: '',
            name: '',
            description: '',
            quantity: '',
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
                this.setState({image: data.image,
                    name: data.name,
                    description : data.description,
                    quantity : data.quantity,
                });
            });
        }        
    }
    // save and update dish function.
    saveOrUpdateDish = (e) => {
        e.preventDefault();
        let dish = {image: this.state.image, name: this.state.name, description: this.state.description, quantity: this.state.quantity};
        console.log('dish => ' + JSON.stringify(dish));

        // form data.
        const formData = new FormData();
        formData.append('image', this.state.image)
        formData.append('name', this.state.name)
        formData.append('description', this.state.description)
        formData.append('quantity', this.state.quantity)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
              },
              body: formData
        }
        /*
            step 5.
            in the saveOrUpdateDish() method, we check if the id is "create" then we call DishService.create() method which
            internally makes a rest API call to store dish data into mysql database. if id is any positive number than we call
            DishService.updateDataById() method which internally makes a rest API call to store updated dish into mysql database.
        */
        if(this.state.id === 'create'){
            DishService.create(dish, config).then(res =>{
                this.props.history.push('/dish');
                // console.log('data create sent: ', res);
            });
        }else{
            DishService.updateDataById(this.state.id, config).then( res => {
                this.props.history.push('/dish');
                console.log('data update sent: ', res);
            });
        }
    }
    
    changeimageURLHandler= (event) => {
        // this.setState({image: event.target.value});
        this.setState({image: event.target.files[0]});
    }

    changedishNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }
    changeQuantityHandler= (event) => {
        this.setState({quantity: event.target.value});
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
                                {this.getTitle()}
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Image: </label>
                                            <input type="file" name="image" className="form-control"
                                                value={this.state.image} onChange={this.changeimageURLHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Dish Name: </label>
                                            <input placeholder=" Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changedishNameHandler}/>
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

export default CreateDishComponent