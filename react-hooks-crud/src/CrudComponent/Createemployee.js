import React, { useState } from 'react'  
import axios from 'axios';  
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap';  
function Createemployee(props) {  
  const [employee, setemployee] = useState({ name: '', department: '', age: '', city: '', country: '', gender: '' });  
  // const [showLoading, setShowLoading] = useState(false);  
  const apiUrl = "http://localhost:8000/crud/create";  
  
  const Insertemployee = (e) => {  
    e.preventDefault();  
    // debugger;  
    const data = { name:employee.name, department: employee.department, age: employee.age, city:employee.city, country: employee.country, gender: employee.gender };  
    axios.post(apiUrl, data)  
      .then((result) => {  
        props.history.push('/EmployeList')  
      });  
  };  
  const onChange = (e) => {  
    e.persist();  
    // debugger;  
    setemployee({...employee, [e.target.name]: e.target.value});  
  }  
  
  return (  
    <div className="app flex-row align-items-center">  
      <Container>  
        <Row className="justify-content-center">  
          <Col md="12" lg="10" xl="8">  
            <Card className="mx-4">  
              <CardBody className="p-4">  
                <Form onSubmit={Insertemployee}>  
                  <h1>Register</h1>  
                  <InputGroup className="mb-3">  
  
                    <Input type="text" name="name" id="name" placeholder="Name" value={employee.name} onChange={ onChange }  />  
                  </InputGroup>  
                   <InputGroup className="mb-3">  
  
                    <Input type="text" placeholder="department" name="department" id="department" value={employee.department} onChange={ onChange }/>  
                  </InputGroup>  
                  <InputGroup className="mb-3">  
  
                    <Input type="text" placeholder="age" name="age" id="age"  value={employee.age} onChange={ onChange }  />  
                  </InputGroup>  
                  <InputGroup className="mb-4">  
  
                    <Input type="text" placeholder="city" name="city" id="city" value={employee.city} onChange={ onChange }  />  
                  </InputGroup>  
                  <InputGroup className="mb-4">  
  
                    <Input type="text" placeholder="country" name="country" id="country" value={employee.country} onChange={ onChange } />  
                  </InputGroup>  
                  <InputGroup className="mb-4">   
  
                     <Input type="text" placeholder="gender" name="gender" id= "gender" value={employee.gender} onChange={ onChange } />  
                  </InputGroup>   
             <CardFooter className="p-4">  
                <Row>  
                  <Col xs="12" sm="6">  
                    <Button type="submit" className="btn btn-info mb-1" block><span>Save</span></Button>  
                  </Col>  
                  <Col xs="12" sm="6">  
                    <Button className="btn btn-info mb-1" block><span>Cancel</span></Button>  
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
  )  
}  
export default Createemployee  