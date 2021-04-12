import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar } from "reactstrap";
import SideBar from "./navbarSlide";
import {connect} from 'react-redux'
import "../../App.css"

class NavMenu extends React.Component {
  constructor(props) {
    super();
    this.state = {
      width: window.innerWidth,
    };
  }
  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };
  // logout.
  onClick = () => {
    localStorage.clear();
    window.location.reload(false);
  };
  render() {
    const { width } = this.state;
    const isMobile = width <= 500;

    if (isMobile) {
      return (
        <div color="white" style={{ height: 100 }} className="fixed-top" id="App" >
          <center>
            INVENTORY
          </center>
          <div>
            <SideBar />
          </div>
        </div>
      );
    } else {
      return (
        // if, user not register or login, only show button signin and signup.
        <Navbar color="white" className="fixed-top" style={{position: "",width: "100%", boxShadow: "0 2px 6px 0 rgba(0,0,0,.2)", margin:"0"}} light expand="md">
          <NavLink className="navbar-brand" to="/"> INVENTORY </NavLink>
          <ul className="ml-auto navbar-nav" > {this.props.auth.isAuthenticated !== true ? (
              <>
            <li className="nav-item" style={{ padding: 10, backgroundColor: "rgb(31, 43, 82)", borderRadius: 10, marginRight: 10}}>
              <NavLink style={{ color: "white" }} className="page-scroll" to="/signin">Signin</NavLink>
            </li>
            <li className="nav-item" style={{ padding: 10, backgroundColor: "rgb(31, 43, 82)", borderRadius: 10, marginRight: 10}}>
              <NavLink style={{ color: "white" }} className="page-scroll" to="/signup"> Signup </NavLink>
            </li>
            </>
            ):(
              <>
              {/* else, user already login, will show button Inventory and logout. */}
            <li className="nav-item" style={{ padding: 10, backgroundColor: "rgb(31, 43, 82)", borderRadius: 10, marginRight: 10}}>
              <NavLink style={{ color: "white" }} className="nav-link" to="/dish"> Inventory </NavLink>
            </li>
            <li className="nav-item" style={{ padding: 10, backgroundColor: "rgb(31, 43, 82)", borderRadius: 10, marginRight: 10}}>
              <NavLink style={{ color: "white" }} className="nav-link" to="/stock"> Stock </NavLink>
            </li>
            <li className="nav-item" style={{ padding: 10, backgroundColor: "rgb(31, 43, 82)", borderRadius: 10, marginRight: 10}}>
              <NavLink style={{ color: "white" }} className="nav-link" to="/checkout"> Checkout </NavLink>
            </li>
            <li className="nav-item" style={{ padding: 10, backgroundColor: "rgb(31, 43, 82)", borderRadius: 10, marginRight: 10}}>
              <NavLink style={{ color: "white" }} className="nav-link" to="/" href="/" onClick={this.onClick} > Logout </NavLink>
            </li>
              </>
            )}
          </ul>
        </Navbar>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(NavMenu);