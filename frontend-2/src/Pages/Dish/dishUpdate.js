import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import DishService from '../../Services/dishServices';

const CreateDishComponent = () => {
 const history = useHistory();
 let { id } = useParams();
 const [image, setImage] = useState('');

 const {
  register,
  handleSubmit,
  formState: { errors },
  setValue,
 } = useForm();

 useEffect(() => {}, []);

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

 const cancel = () => history.push('/dish');

 const onSubmit = (data, e) => {
  const formData = new FormData();
  formData.append('image', data.image);
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('quantity', data.quantity);

  const config = {
   headers: {
    'Content-Type': 'multipart/form-data',
   },
   body: formData,
  };

  if (id === 'create') {
   DishService.create(formData, config).then((res) => {
    setImage('');
    e.target.reset();
    // this.props.history.push('/dish');
   });
  } else {
   DishService.updateDataById(id, config).then((res) => {
    // this.props.history.push('/dish');
    // console.log('data update sent: ', res);
   });
  }
 };

 return (
  <div className="container" style={{ marginTop: '8rem' }}>
   <div className="row">
    <div className="card col-md-6 offset-md-3 offset-md-3 pt-4">
     <div className="card-body">
      <form onSubmit={handleSubmit(onSubmit)}>
       {id ? (
        <h3 className="text-center">Add Dish</h3>
       ) : (
        <h3 className="text-center">Update Dish</h3>
       )}
       <div className="form-group">
        <label> Image: </label>
        <input
         type="file"
         className="form-control"
         // value={this.state.image.name}
         {...register('image', { required: true })}
         onChange={(e) => changeimageURLHandler(e)}
        />
       </div>
       {image && (
        <div>
         <img src={image} alt="display" />
        </div>
       )}

       <div className="form-group">
        <label> Dish Name: </label>
        <input
         type="text"
         className="form-control"
         {...register('name', { required: true })}
         onChange={(e) => onChangeValue(e, 'name')}
        />
       </div>

       <div className="form-group">
        <label> Description: </label>
        <input
         type="text"
         className="form-control"
         {...register('description', { required: true })}
         onChange={(e) => onChangeValue(e, 'description')}
        />
       </div>

       <div className="form-group">
        <label> Quantity: </label>
        <input
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
