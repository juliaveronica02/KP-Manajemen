import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap';  
import axios from 'axios'

const Createemployee = () => {
 const history = useHistory();
 // value image for select image file from device.
 const [image, setImage] = useState('');
 
 const {register, handleSubmit, setValue} = useForm();

//  handle image upload when create and update image.
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

 const cancel = () => history.push('/EmployeList');
 
  const onSubmit = (data, e) => {
  const formData = new FormData();
  formData.append('image', data.image);
  formData.append('name', data.name);
  formData.append('department', data.department);
  formData.append('age', data.age);
  formData.append('city', data.city);
  formData.append('country', data.country);
  formData.append('gender', data.gender);
  console.log( data, '1. ==================')
  const config = {
   headers: {
    'Content-Type': 'multipart/form-data',
   },
   body: formData,
  };
  axios.post("http://localhost:8000/crud2/create", formData, config)  
      .then((result) => {  
        // e.target.reset(); // reset field.
        setImage('')
        history.push('/EmployeList') 
        console.log('data create success: ', result); 
      }); 
 };

 return (
  <div className="app flex-row align-items-center">  
      <Container>  
        <Row className="justify-content-center">  
          <Col md="12" lg="10" xl="8">  
            <Card className="mx-4">  
              <CardBody className="p-4">  
                <Form onSubmit={handleSubmit(onSubmit)}>  
                  <h1>Register</h1>  
                  <InputGroup className="mb-3">  
                    <Input type="file" name="image" id="image" 
                      {...register('image', { required: true })} 
                      onChange={(e) => changeimageURLHandler(e) }  />  
                    <img src={image} alt="display" style={{width: "100px", marginBottom:"1rem"}} />
                  </InputGroup>  
                  {console.log(image, '2.===============================================')}
                  <InputGroup className="mb-3">  
                    <Input type="text" placeholder="name" name="name" id="name" 
                      {...register('name', { required: true })} 
                      onChange={(e) => onChangeValue(e, 'name') }  />  
                  </InputGroup> 

                   <InputGroup className="mb-3">  
                    <Input type="text" placeholder="department" name="department" id="department" 
                      {...register('department', { required: true })} 
                      onChange={(e)=> onChangeValue(e, 'department') }/>  
                  </InputGroup>  

                  <InputGroup className="mb-3">  
                    <Input type="text" placeholder="age" name="age" id="age" 
                    {...register('age', { required: true })} 
                    onChange={(e)=> onChangeValue(e, 'age') }  />  
                  </InputGroup> 

                  <InputGroup className="mb-4">  
                    <Input type="text" placeholder="city" name="city" id="city" 
                     {...register('city', { required: true })} 
                     onChange={(e)=> onChangeValue(e, 'city') }  />  
                  </InputGroup> 

                  <InputGroup className="mb-4">  
                    <Input type="text" placeholder="country" name="country" id="country" 
                      {...register('country', { required: true })} 
                      onChange={(e)=> onChangeValue(e, 'country') } />  
                  </InputGroup>

                  <InputGroup className="mb-4">   
                     <Input type="text" placeholder="gender" name="gender" id= "gender" 
                      {...register('gender', { required: true })} 
                      onChange={(e)=> onChangeValue(e, 'gender') } />  
                  </InputGroup>   
             <CardFooter className="p-4">  
                <Row>  
                  <Col xs="12" sm="6">  
                    <Button type="submit" className="btn btn-info mb-1" block><span>Save</span></Button>  
                  </Col>  
                  <Col xs="12" sm="6">  
                    <Button className="btn btn-info mb-1" onClick={cancel} block><span>Cancel</span></Button>  
                  </Col>  
                </Row>  
              </CardFooter>  
                </Form>  
              </CardBody>  
            </Card>  
          </Col>  
        </Row>  
      </Container>  
    </div>  
 );
};

export default Createemployee;