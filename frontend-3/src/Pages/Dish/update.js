import React, { useState, useEffect } from 'react'  
import { useForm } from "react-hook-form";
import { useParams } from 'react-router';
import DishService from '../../Services/dishServices'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const UpdateDish = (props) => {  
    const history = useHistory();
    const { id } = useParams();
    const [image, setImage] = useState('');
    const [data, setData] = useState({});
    const {register, handleSubmit, formState: { errors }, setValue} = useForm();

    useEffect(()=> {
        DishService.getDataById(id)
        .then((res)=> {
            setData(res.data)
            console.log("data: ",res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [])

    const changeimageURLHandler = (event) => {
        const file = event.target.files[0];
        if (event.target.files && event.target.files[0]) {
         let reader = new FileReader();
         reader.onload = (e) => {
          setImage(e.target.result);
          setValue('image', file);
         };
         reader.readAsDataURL(file);
        } else {
         setImage('');
         setValue('image', '');
        }
    };
      
    const onChangeValue = (e, name) => {
        setValue(name, e.target.value);
    };
  
    const onSubmit = (data, e) => {
        const formData = new FormData();
        formData.append('image', data.image);
        formData.append('name', data.name);
        formData.append('categories', data.categories);
        formData.append('description', data.description);
        formData.append('quantity', data.quantity);
      
        const config = {
         headers: {
          'Content-Type': 'multipart/form-data',
         },
         body: formData,
        };

        axios.put(`http://localhost:8000/dish/edit/${id}`, formData, config).then((res) => {
            setImage('');
            // clear field.
            // e.target.reset();
            history.push('/dish');
            console.log('data update success: ', res);
        });
    }      

    const cancel = () => history.push('/dish');
    
    return(
        <div className="container" style={{ marginTop: '8rem' }}>
        <div className="row">
         <div className="card col-md-6 offset-md-3 offset-md-3 pt-4">
            <h1 className="text-center">Update Dish</h1> 
          <div className="card-body">
           <form onSubmit={handleSubmit(onSubmit)}>
           <div className="form-group">
                <label> Image: </label>
                <input
                type="file"
                className="form-control"
                defaultValue={data.image}
                {...register('image', { required: true })}
                onChange={(e) => changeimageURLHandler(e)}
                />
            </div>
            {image ? (
        <div>
         <img src={image} alt="display" style={{width: "100px", marginBottom:"1rem"}}/>
        </div>
       ) : data.image ? (
        <div>
         <img src={`http://localhost:8000/${data.image}`} alt="display" style={{width: "100px", marginBottom:"1rem"}}/>
        </div>
       ) : 'Upload image!'
    }
            
            <div className="form-group">
             <label> Dish Name: </label>
             <input
               type="text"
               className="form-control"
               defaultValue={data.name}
               {...register('name', { required: true })}
               onChange={(e) => onChangeValue(e, 'name')}
             />
            </div>
            
            <div className="form-group">
             <label> Category: </label>
             <input
              type="text"
              className="form-control"
              defaultValue={data.categories}
              {...register('categories', { required: true })}
              onChange={(e) => onChangeValue(e, 'categories')}
             />
            </div>
     
            <div className="form-group">
             <label> Description: </label>
             <textarea className="form-control" 
              rows="5"
              defaultValue={data.description}
              {...register('description', { required: true })}
              onChange={(e) => onChangeValue(e, 'description')}
             />
            </div>
     
            <div className="form-group">
             <label> Quantity: </label>
             <input
              type="number"
              className="form-control"
              defaultValue={data.quantity}
              {...register('quantity', { required: true })}
              onChange={(e) => onChangeValue(e, 'quantity')}
             />
            </div>
     
            <button className="btn btn-success" type="submit">
             Save
            </button>
            <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: '10px' }}>
             Cancel
            </button>
           </form>
          </div>
         </div>
        </div>
       </div>
    )
}  
export default UpdateDish   