// Dish list.
// Importing React since we are using React.
import React, { useState, useEffect } from 'react'
import DishService from '../../Services/dishServices'
// Import moment js library to format date in table.
import moment from 'moment';

export default function DishList(props) {
    const [data, setData] = useState([])

    useEffect(()=> {
        DishService.getAllData()
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    }, []) 

    const deleteDataById = (id) => {
        DishService.deleteDataById(id)
        .then((res) => setData(data.filter((data) => data.id !== id)))
        .catch((err) => console.log(err));
    }
    const addDish = () => {  
        props.history.push({  
          pathname: '/create' 
        });  
      }; 
    
    const editDish = (id) => {  
        props.history.push({  
            pathname: '/edit/' + id  
        });  
    };   
    
    const viewDish = (id) => {  
        props.history.push({  
            pathname: '/view/' + id  
        });  
    }; 
    
    return (
        <div style={{marginTop:"8rem", padding: 180, paddingTop: 0}}>
             <h2 className="text-center">Dish List</h2>
             <div className = "row">
                <button className="btn btn-primary" onClick={()=> {addDish()}}> Add Dish</button>
             </div>
             <br></br>
             <div className = "row">
                    <table className = "table table-striped table-bordered text-center">

                        <thead>
                            <tr>
                                <th> Id </th>
                                <th> Image</th>
                                <th> Name</th>
                                <th> Description</th>
                                <th> Quantity</th>
                                <th> Create Time</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* we are using the ES6 feature that is map operator to loop over our dish list and create the view. */}
                            {   
                                data.map(
                                    dish => 
                                    <tr key = {dish.id}>
                                        <td>{dish.id}</td>
                                         <td><img src={`http://localhost:8000/${dish.image}`} alt="images" style={{width: "100px"}} /></td>   
                                         <td style={{ textTransform: 'capitalize'}}> {dish.name}</td>
                                         <td> {dish.description}</td>
                                         <td> {dish.quantity > 0 ? <span className={'badge bg-primary'}>{dish.quantity}</span>:
                                              <span className={'badge bg-danger'}>Out Of Stock !!</span> } </td>
                                         <td> {moment(dish.createdAt).format('LLLL')}</td>
                                         <td>
                                             <button onClick={ () => editDish(dish.id)} className="btn btn-info">Update </button>
                                             <button style={{marginLeft: "10px"}} onClick={ () => deleteDataById(dish.id)} className="btn btn-danger">Delete </button>
                                             <button style={{marginLeft: "10px"}} onClick={ () => viewDish(dish.id)} className="btn btn-info">View </button>
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