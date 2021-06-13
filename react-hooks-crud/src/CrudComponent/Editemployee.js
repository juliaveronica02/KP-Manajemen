import React, { useState, useEffect } from 'react'  
import axios from 'axios';  
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap';  
function Editemployee(props) {  
        const [employee, setemployee]= useState({id:'',name: '', department: '', age: '', city: '', country: '', gender: '' });  
        const Url = "http://localhost:8000/crud/show/" + props.match.params.id;  
        
        useEffect(() => {  
          const GetData = async () => {  
            const result = await axios(Url);  
            setemployee({
              name: result.data.name,
              department: result.data.department,
              age: result.data.age,
              city: result.data.city,
              country: result.data.country,
              gender: result.data.gender
            })
            console.log("setemployee: ", result.data);
          };  
          GetData();  
        }, []);  
        
        const UpdateEmployee = (e) => {  
          e.preventDefault();  
          const data = { name:employee.name, department: employee.department, age: employee.age, city:employee.city, country: employee.country, gender: employee.gender };  
          axios.put('http://localhost:8000/crud/edit/'+props.match.params.id, data)  
            .then((result) => {  
              props.history.push('/EmployeList')  
            });  
        };  
        
        const onChange = (e) => {  
          e.persist();  
          setemployee({...employee, [e.target.name]: e.target.value});  
        }  
        
        return (  
                <div className="app flex-row align-items-center">  
                <Container>  
                  <Row className="justify-content-center">  
                    <Col md="12" lg="10" xl="8">  
                      <Card className="mx-4">  
                        <CardBody className="p-4">  
                          <Form onSubmit={UpdateEmployee}>  
                            <h1>Update Employee</h1>  
                        
                            <InputGroup className="mb-3">  
            
                              <Input type="text" name="name" id="name" placeholder="name" value={employee.name} onChange={ onChange }  />  
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
  
export default Editemployee  