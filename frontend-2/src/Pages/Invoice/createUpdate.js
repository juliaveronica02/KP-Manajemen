import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import InvoiceService from '../../Services/invoices';

const CreateInvoiceComponent = () => {
 const history = useHistory();
 let { id } = useParams();
 const [image, setImage] = useState('');
 //  set dish state.
 const [data, setData] = useState([]);
 const { register, handleSubmit, setValue } = useForm();

 useEffect(() => {
  InvoiceService.getDataById(id)
   .then((response) => {
    setData(response.data);
    console.log('data 2: ', response.data);
   })
   .catch((error) => {
    console.log('error', error);
   });
 }, [id]);

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
  e.preventDefault();
  const formData = new FormData();
  formData.append('image', data.image);
  formData.append('price', data.price);
  formData.append('store_name', data.store_name);
  formData.append('sales_name', data.sales_name);
  formData.append('address', data.address);
  formData.append('description', data.description);
  formData.append('phone', data.phone);

  const config = {
   headers: {
    'Content-Type': 'multipart/form-data',
   },
   body: formData,
  };

  if (id === 'create') {
   InvoiceService.create(formData, config).then((res) => {
    setImage('');
    // clear field.
    // e.target.reset();
    history.push('/invoice');
    console.log('data create success: ', res);
   });
  } else {
   InvoiceService.updateDataById(id, config, formData).then((res) => {
    setImage('');
    history.push('/invoice');
    console.log('data update success: ', res);
   });
  }
 };

 const getTitle = () => {
  if (id === 'create') {
   return <h3 className="text-center">Add Invoice</h3>;
  } else {
   return <h3 className="text-center">Update Invoice</h3>;
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
        <label> Image: </label>
        <input
         type="file"
         className="form-control"
         {...register('image', { required: true })}
         onChange={(e) => changeimageURLHandler(e)}
        />
       </div>
       {image && (
        <div>
         <img src={image} alt="display" style={{ width: '100px', marginBottom: '1rem' }} />
        </div>
       )}
       <div className="form-group">
        <label> Price: </label>
        <input
         type="number"
         className="form-control"
         {...register('price', { required: true })}
         onChange={(e) => onChangeValue(e, 'price')}
        />
       </div>

       <div className="form-group">
        <label> Store Name: </label>
        <input
         type="text"
         className="form-control"
         {...register('store_name', { required: true })}
         onChange={(e) => onChangeValue(e, 'store_name')}
        />
       </div>

       <div className="form-group">
        <label> Sales Name: </label>
        <input
         type="text"
         className="form-control"
         {...register('sales_name', { required: true })}
         onChange={(e) => onChangeValue(e, 'sales_name')}
        />
       </div>

       <div className="form-group">
        <label> Address: </label>
        <textarea
         className="form-control"
         rows="5"
         {...register('address', { required: true })}
         onChange={(e) => onChangeValue(e, 'address')}
        />
       </div>

       <div className="form-group">
        <label> Description: </label>
        <textarea
         className="form-control"
         rows="5"
         {...register('description', { required: true })}
         onChange={(e) => onChangeValue(e, 'description')}
        />
       </div>

       <div className="form-group">
        <label> Phone: </label>
        <input
         type="number"
         className="form-control"
         {...register('phone', { required: true })}
         onChange={(e) => onChangeValue(e, 'phone')}
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

export default CreateInvoiceComponent;
