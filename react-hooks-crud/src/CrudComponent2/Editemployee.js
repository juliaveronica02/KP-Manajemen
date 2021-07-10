import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap';  
import axios from 'axios'

const Createemployee = () => {
 const history = useHistory();
 let { id } = useParams();
 // value image for select image file from device.
 const [image, setImage] = useState('');
 const [employee, setemployee]= useState({image:'',name: '', department: '', age: '', city: '', country: '', gender: '' });  
  // shorthand.
  useEffect(()=> {
    const URL = "http://localhost:8000/crud2/show/" + id;
    axios.get(URL)
    .then((res)=> {
      setemployee(res.data)
      console.log("data: ", res.data);
    })
    .catch((err) => {
     console.log(err);
   });
  },[id])

//   const Url = "http://localhost:8000/crud2/show/" + id;  

//   useEffect(()=>{
//    const GetData = async () => {
//       const result = await axios(Url)
//       setemployee({
//         image: result.data.image,
//         name: result.data.name,
//         department: result.data.department,
//         age: result.data.age,
//         city: result.data.city,
//         country: result.data.country,
//         gender: result.data.gender
//       })
//       console.log("setemployee: ", result.data);
//    }
//    GetData();  
//  }, [])
 
 const {register, handleSubmit, setValue} = useForm();

  // handle image upload when create and update image.
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

 const onChangeValue = (e) => {
  e.persist();  
  // setValue(name, e.target.value);
  let { name, value } = e.currentTarget;
  setemployee({
    ...employee,
    [name]: value,
  });
};

 const cancel = () => history.push('/EmployeList');
 
  const UpdateEmployee = (data, e) => {
  e.preventDefault();  
  const formData = new FormData();
  formData.append('image', data.image);
  formData.append('name', data.name);
  // formData.append('department', data.department);
  // formData.append('age', data.age);
  // formData.append('city', data.city);
  // formData.append('country', data.country);
  // formData.append('gender', data.gender);
  console.log( data, '1. ==================')
  const config = {
   headers: {
    'Content-Type': 'multipart/form-data',
   },
   body: formData,
  };
  axios.put("http://localhost:8000/crud2/edit/"+id, formData, config)  
      .then((result) => {  
        // e.target.reset(); // reset field.
        history.push('/EmployeList') 
        console.log('data updated success: ', result); 
      })
      .catch((err) => {
        console.log(err);
      }); 
 };

 return (
  <div className="app flex-row align-items-center">  
      <Container>  
        <Row className="justify-content-center">  
          <Col md="12" lg="10" xl="8">  
            <Card className="mx-4">  
              <CardBody className="p-4">  
                <Form onSubmit={handleSubmit(UpdateEmployee)}>  
                  <h1>Update Employee</h1>  
                  <InputGroup className="mb-3">  
                    <Input type="file" name="image" id="image" 
                      defaultValue={employee.image}
                      {...register('image', { required: true })}
                      onChange={(e) => changeimageURLHandler(e) }  
                      />  
                    {image ? (
        <div>
         <img src={image} alt="display" style={{width: "100px", marginBottom:"1rem"}}/>
        </div>
       ) : employee.image ? (
        <div>
         <img src={`http://localhost:8000/${employee.image}`} alt="display" style={{width: "100px", marginBottom:"1rem"}}/>
        </div>
       ) : 'Upload image!'
    }
                  </InputGroup>  
                  <InputGroup className="mb-3">  
                    <Input type="text" placeholder="name" name="name" id="name" 
                      defaultValue={employee.name} 
                      {...register('name', { required: true })}
                      onChange={ (e)=> onChangeValue(e, 'name') }  
                      /> 
                  </InputGroup> 

                   {/* <InputGroup className="mb-3">  
                    <Input type="text" placeholder="department" name="department" id="department" 
                      defaultValue={employee.department}
                      {...register('department', { required: true })}
                      onChange={(e)=> onChangeValue(e, 'department') }/>  
                  </InputGroup>  

                  <InputGroup className="mb-3">  
                    <Input type="text" placeholder="age" name="age" id="age" 
                    defaultValue={employee.age}
                    {...register('age', { required: true })}
                    onChange={(e)=> onChangeValue(e, 'age') }  />  
                  </InputGroup> 

                  <InputGroup className="mb-4">  
                    <Input type="text" placeholder="city" name="city" id="city" 
                     defaultValue={employee.city}
                    {...register('city', { required: true })}
                     onChange={(e)=> onChangeValue(e, 'city') }  />  
                  </InputGroup> 

                  <InputGroup className="mb-4">  
                    <Input type="text" placeholder="country" name="country" id="country" 
                      defaultValue={employee.country}
                      {...register('country', { required: true })}
                      onChange={(e)=> onChangeValue(e, 'country') } />  
                  </InputGroup>

                  <InputGroup className="mb-4">   
                     <Input type="text" placeholder="gender" name="gender" id= "gender" 
                      defaultValue={employee.gender}
                      {...register('gender', { required: true })}
                      onChange={(e)=> onChangeValue(e, 'gender') } />  
                  </InputGroup>    */}
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