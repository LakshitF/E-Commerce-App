import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../css/main.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

class ResetPass extends Component {
  constructor(props)
  {
    super(props);
    this.state={token:''};
  }

  componentDidMount(){
    const {token}=this.props.match.params;  //very important to destructure
    console.log(token);
    this.setState({token:token});
  }

  render() {
    return (
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
              <form action="/api/newPassword" method="POST">
                    <TextField
                    style={{}}
                    name="email"
                    label="Email"
                    type="email"
                    margin="normal"
                    />
                    <br></br>
                    <TextField
                    style={{}}
                    name="password"
                    label="Password"
                    type="password"
                    margin="normal"
                    />
                    <br></br>
                  <Button variant="contained" color="primary" type="submit">
                    Update Password
                  </Button>
                  <input type="hidden" name="token" id="token" value={this.state.token}/>
              </form>
          </div>
    );
  }
}

export default ResetPass;
