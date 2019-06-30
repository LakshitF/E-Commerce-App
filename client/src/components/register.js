import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../css/main.css";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmpassword: "",
      action: "reset",
      done: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.passHandle = this.passHandle.bind(this);
  }

  passHandle(event) {
    if (this.state.action == "submit") {
      return; //Imp to check this or we end up calling set state everytime
    }
    event.preventDefault();
    if (this.state.password !== this.state.confirmpassword) {
      this.setState({ action: "reset", done: true });
      return;
    }
    console.log(this.state.password);
    console.log(this.state.confirmpassword);
    this.setState({ action: "submit" });
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <form
          action="/api/signup"
          method="POST"
          style={{ left: "auto", right: "auto", top: "auto", bottom: "auto" }}
        >
          <TextField
            style={{}}
            name="username"
            label="Username"
            type="email"
            onChange={this.handleInputChange}
            margin="normal"
          />
          <br />
          <TextField
            name="email"
            label="Email"
            type="email"
            onChange={this.handleInputChange}
            margin="normal"
          />
          <br />
          <TextField
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
            onChange={this.handleInputChange}
          />
          <br />
          <TextField
            name="confirmpassword"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
            onChange={this.handleInputChange}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={this.passHandle}
            type={this.state.action}
          >
            Signup
          </Button>
        </form>
      </div>
    );
  }
}

export default Register;
