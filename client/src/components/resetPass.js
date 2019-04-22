import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../css/main.css';
import axios from 'axios';

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
          <form className="product-form" action="/newPassword/" method="POST">
              <div className="form-control">
                  <label >Enter email again</label>
                  <input type="text" name="email"/>
                  <label >New Password</label>
                  <input type="text" name="password" id="password"/>
                  <input type="hidden" name="token" id="token" value={this.state.token}/> //set the value in the value tag lol!
              </div>
              <button type="submit">Update Password</button>
          </form>
    );
  }
}

export default ResetPass;
