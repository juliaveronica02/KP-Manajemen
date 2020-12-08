import axios from "axios";
import setAuthToken from "../utils/authToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
import Swal from 'sweetalert2'

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  console.log("user", userData);
  axios.post(`https://api.juliaveronica.com/users/register`, userData)
    .then((res) => {
      Swal.fire({ icon: `success`, title: `Register Success`,// text: `Something Went Wrong!`
      })
      history.push("/signin")
    })
    .catch((err) => {
      console.log("error", err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      },
      );
    });
//     .catch((err) => {
//       console.error(err.response)
//       if(err.response.status === 400){
//         Swal.fire('Password must match')
//       }
//       else if(err.response.status === 401){
//         Swal.fire('Email already Registered')
//       }
//       else if(err.response.status === 402){
//         Swal.fire('Phone Already in Use')
//       }
//       else{dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data,
//       })}
//     })
};

// Login - get user token.
export const loginUser = (userData) => (dispatch) => {
  axios.post(`${process.env.REACT_APP_API_URL_LOGIN}`, userData)
    .then((res) => {
      console.log("login response",res);
      // Save to localStorage Set token to localStorage.
      const token = res.data.token;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header.
      setAuthToken(token);
      // Decode token to get user data.
      const decoded = jwt_decode(token);
      // Set current user.
      dispatch(setCurrentUser(decoded), 
      Swal.fire({
        icon: 'success',
        title: 'Login Success'
      })
      );
      
    })
    .catch((err) => {
      console.error(err.response)
      if(err.response.status === 400){
        Swal.fire(
          {
            icon: 'error',
            text: 'Incorrect Password'
          }
        )
      }
      else if(err.response.status === 404){
        Swal.fire(
          {
            icon: 'error',
            text: 'Email Not Found'
          }
        )
      }
    })
    //   dispatch({type: GET_ERRORS, payload: err.response },
    //     // Swal.fire({
    //     //     icon: `error`,
    //     //     title: `Sorry`,
    //     //     text: `Incorrect Email or Password`
    //     //   })
    //  )});
    // .catch((err) =>  Swal.fire({
    //   icon: `error`,
    //   title: `Sorry`,
    //   text: `Something Went Wrong!`
    // }))
};
// Set logged in user.
export const setCurrentUser = (decoded) => {
  return { type: SET_CURRENT_USER, payload: decoded };
};
// User loading.
export const setUserLoading = () => {
  return { type: USER_LOADING };
};
// Log user out.
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage.
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests.
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false.
  dispatch(setCurrentUser({}));
};