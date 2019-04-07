import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../css/main.css';

class Register extends Component {
  constructor(props)
  {
    super(props);
    this.state={email:'',password:'',confirmpassword:''};
    this.handleInputChange=this.handleInputChange.bind(this);
    this.passHandle=this.passHandle.bind(this);
  }

  passHandle(event){
    if(this.state.password!==this.state.confirmpassword)
      return "reset";

    console.log('here');
    return "submit";
  }

  handleInputChange=event=>{
    this.setState({[event.target.name]:event.target.value});
  }

  render() {
    return (
      <div>
          <h2>Already a registered User? Sign in!</h2>
          <form className="product-form" action="/signup" method="POST">
              <div className="form-control">
                  <label >Username</label>
                  <input type="text" name="username" id="username"/>
                  <label>Email</label>
                  <input type="text" name="email" id="email" onChange={this.handleInputChange}/>
                  <label  type="text">Password</label>
                  <input type="text" name="password" onChange={this.handleInputChange}/ >
                  <label type="text">Confirm Password</label>
                  <input type="text" name="confirmpassword" onChange={this.handleInputChange}/ >
              </div>

              <button type={this.passHandle}>Signup</button>
          </form>
          </div>
    );
  }
}

export default Register;
