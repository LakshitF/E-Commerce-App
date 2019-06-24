import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../css/main.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
class Reset extends Component {
  render() {
    return (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <form action="/forgot" method="POST">
                <TextField
                style={{}}
                name="email"
                label="Email"
                type="email"
                margin="normal"
                />
                <br></br>
              <Button variant="contained" color="primary" type="submit">
                Send reset link
              </Button>
          </form>
      </div>
    );
  }
}

export default Reset;
