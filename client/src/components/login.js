import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../css/main.css";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <form action="/login" method="POST">
          <TextField
            style={{}}
            name="email"
            label="Email"
            type="email"
            margin="normal"
          />
          <br />
          <TextField
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
          />
          <br />
          <br />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
          <br />
          <br />
          <Button variant="contained" color="primary">
            <NavLink to="/reset">Forgot password? </NavLink>
          </Button>
        </form>
      </div>
    );
  }
}

export default Login;
