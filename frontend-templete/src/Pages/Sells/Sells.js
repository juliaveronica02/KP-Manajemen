import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import { Card, Button, Container, Row } from "react-bootstrap";
// import styled from "styled-components";
class Sell extends Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
  }
  handleSubmit = (values, actions) => {
    var formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    // Object.keys(values).forEach(function (key) {
    //   formData.append(key.values[key]);
    // });
    formData.append("imageUrl", this.imageRef.current.files[0]);
    axios
      .post("https://api.juliaveronica.com/item/create", formData, {
        headers: {
          "x-access-token": localStorage.getItem("jwtToken"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <Formik
        initialValues={{
          name: "",
          price: "",
          description: "",
          imageUrl: "",
          quantity: "",
          categoryId: "",
        }}
        validate={(values) => {
          let errors = {};
          if (!values.name) {
            errors.name = (
              <small className="form-text text-danger">Name is required</small>
            );
            return errors;
          }
        }}
        onSubmit={this.handleSubmit}
        render={(formProps) => {
          return (
            <Form>
              <div style={{ marginTop: 100 }} className="container">
                <div className="row justify-content-md-center">
                  <div className="col-sm-6">
                    <div className="card" style={{ width: "25rem" }}>
                      <div className="card-body">
                        <div className="form-group">
                          <Field
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="name"
                          />
                          <ErrorMessage name="name" />
                        </div>
                        <div className="form-group">
                          <Field
                            type="text"
                            className="form-control"
                            name="price"
                            placeholder="price"
                          />
                        </div>
                        <div className="form-group">
                          <Field
                            type="text"
                            className="form-control"
                            name="description"
                            placeholder="description"
                          />
                        </div>
                        <div className="form-group">
                          <Field
                            type="text"
                            className="form-control"
                            name="quantity"
                            placeholder="quantity"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="file"
                            className="form-control"
                            name="imageUrl"
                            ref={this.imageRef}
                          />
                        </div>
                        <div className="form-group">
                          <Field
                            type="text"
                            className="form-control"
                            name="categoryId"
                            placeholder="category ID"
                          />
                          <ErrorMessage name="establishment" />
                        </div>
                        <button
                          className="btn btn-outline-primary"
                          type="submit"
                          disabled={formProps.isSubmitting}
                        >
                          Add Product
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );}}
          />
        );
      }
    }
    export default Sell;
    // const Wrapper = styled.section`
    //   padding: 0;
    //   margin: 0;
    //   align-content: center;
    // `;