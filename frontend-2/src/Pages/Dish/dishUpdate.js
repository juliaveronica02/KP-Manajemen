import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import DishService from '../../Services/dishServices';
// import axios from 'axios';

const CreateDishComponent = () => {
 const history = useHistory();
 let { id } = useParams();
 // value image for select image file from device.
 const [imageDisplay, setImageDisplay] = useState('');

 const { register, handleSubmit, setValue, reset } = useForm();

 useEffect(() => {
  DishService.getDataById(id)
   .then((result) => {
    const { image, name, category_id, description, quantity } = result.data;
    setImageDisplay(image);
    // setValue('image', '');
    setValue('name', name);
    setValue('categories', category_id);
    setValue('description', description);
    setValue('quantity', quantity);
   })
   .catch((error) => {
    console.log('error', error);
   });
 }, [id, setValue]);

 const changeimageURLHandler = (event) => {
  console.log('trigger');
  const file = event.target.files[0];
  console.log(file);
  if (event.target.files && event.target.files[0]) {
   let reader = new FileReader();
   reader.onload = (e) => {
    setImageDisplay(e.target.result);
    setValue('image', file);
   };
   reader.readAsDataURL(file);
  } else {
   setImageDisplay('');
   setValue('image', '');
  }
 };

 const onChangeValue = (e, name) => {
  setValue(name, e.target.value);
 };

 const cancel = () => history.push('/dish');

 const onSubmit = (value, e) => {
  const formData = new FormData();
  const config = {
   headers: {
    'Content-Type': 'multipart/form-data',
   },
   body: formData,
  };
  if (id === 'create') {
   formData.append('image', value.image);
   formData.append('name', value.name);
   formData.append('categories', value.categories);
   formData.append('description', value.description);
   formData.append('quantity', value.quantity);
   DishService.create(formData, config).then((res) => {
    setImageDisplay('');
    reset();
    history.push('/dish');
   });
  } else {
   // jangan langsung kirim ke axios
   // cari tau gimana handle value untuk input type file
   console.log(value);
   // axios.put(`http://localhost:8000/dish/edit/${id}`, formData, config).then((res) => {
   //  setImage('');
   //  history.push('/dish');
   //  console.log('data update success: ', res);
   // });
  }
 };

 // change title.
 const getTitle = () => {
  if (id === 'create') {
   return <h3 className="text-center">Add Dish</h3>;
  } else {
   return <h3 className="text-center">Update Dish</h3>;
  }
 };

 return (
  <div className="container" style={{ marginTop: '8rem' }}>
   <div className="row">
    <div className="card col-md-6 offset-md-3 offset-md-3 pt-4">
     {getTitle()}
     <div className="card-body">
      <form onSubmit={handleSubmit(onSubmit)}>
       <div className="form-group">
        <label> {id ? 'Update Image :' : 'Image :'} </label>
        <input
         id="image"
         type="file"
         className="form-control"
         {...register('image', { required: true })}
         onChange={(e) => changeimageURLHandler(e)}
        />
       </div>

       {imageDisplay && (
        <div>
         <img
          src={id ? `http://localhost:8000/${imageDisplay}` : imageDisplay}
          alt="display"
          style={{ width: '100px', marginBottom: '1rem' }}
         />
        </div>
       )}

       {!imageDisplay && <p>Upload image!</p>}

       <div className="form-group">
        <label> Dish Name: </label>
        <input
         id="name"
         type="text"
         className="form-control"
         {...register('name', { required: true })}
         onChange={(e) => onChangeValue(e, 'name')}
         placeholder="update"
        />
       </div>

       <div className="input-group mb-3">
        <div className="input-group">
         <label>Categories:</label>
        </div>
        <select
         className="custom-select"
         id="categories"
         {...register('categories', { required: true })}
         onChange={(e) => onChangeValue(e, 'categories')}
        >
         <option>Choose Categories!</option>
         <option value="0">0</option>
         <option value="1">1</option>
         <option value="2">2</option>
        </select>
       </div>

       <div className="form-group">
        <label> Description: </label>
        <textarea
         id="description"
         className="form-control"
         rows="5"
         {...register('description', { required: true })}
         onChange={(e) => onChangeValue(e, 'description')}
        />
       </div>

       <div className="form-group">
        <label> Quantity: </label>
        <input
         id="quantity"
         type="number"
         className="form-control"
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
 );
};

export default CreateDishComponent;
