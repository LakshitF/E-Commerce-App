import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../css/main.css";
import axios from "axios";
class Navbar extends Component {
  constructor(props) {
    super(props); //never forget or this is undefined
    this.state = { log: props.logged };
    this.handleSignout = this.handleSignout.bind(this);
  }

  handleSignout() {
    axios
      .post("/api/signout")
      .then(data => {
        //this dereferencing is super important
        this.setState({ log: data.log });
        console.log("Signed out successfully!");
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    axios
      .get("/api/login")
      .then(data => {
        //this dereferencing is super important
        this.setState({ log: data.data.log });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let label;
    let label2;
    if (this.state.log) {
      label = (
        <span
          className="main-header__item"
          style={{ alignSelf: "right", marginLeft: 900 }}
        >
          <NavLink to="/" replace>
            <button onClick={this.handleSignout}> Sign Out </button>
          </NavLink>
        </span>
      );
    } else {
      label = (
        <span
          className="main-header__item"
          style={{ alignSelf: "right", marginLeft: 900 }}
        >
          <NavLink to="/register" replace>
            Register
          </NavLink>
        </span>
      );
      label2 = (
        <span className="main-header__item" style={{ alignSelf: "right" }}>
          <NavLink to="/login" replace>
            Login
          </NavLink>
        </span>
      );
    }

    return (
      <header className="main-header">
        <nav className="main-header__nav">
          <span className="main-header__item">
            <NavLink to="/shop" replace>
              Shop
            </NavLink>
          </span>
          <span className="main-header__item">
            <NavLink to="/add-product" replace>
              Add Product
            </NavLink>
          </span>
          <span className="main-header__item">
            <NavLink to="/cart" replace>
              My CART
            </NavLink>
          </span>
          {label}
          {label2}
        </nav>
      </header>
    );
  }
}

export default Navbar;
