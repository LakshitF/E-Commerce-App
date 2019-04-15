import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../css/main.css';
import {Alert } from 'react-bootstrap';
let bg=require('../images/bg-01.jpg');

class Register extends Component {
  constructor(props)
  {
    super(props);
    this.state={email:'',password:'',confirmpassword:'',action:'submit'};
    this.handleInputChange=this.handleInputChange.bind(this);
    this.passHandle=this.passHandle.bind(this);

  }

  passHandle(event){
    event.preventDefault();
    if(this.state.password!==this.state.confirmpassword)
      this.setState({action:'reset'});

    console.log('here');
    console.log(this.state.password);
    console.log(this.state.confirmpassword);
    this.setState({action:'submit'});
  }

  handleInputChange=event=>{
    this.setState({[event.target.name]:event.target.value});
  }

  render() {
    return (
      <div style={{width: '100%',height:'800px',
      backgroundImage:"url("+bg+")",
      backgroundSize: '100%',display:'flex',flexDirection:'column'}}>
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
              <button onClick={this.passHandle} type={this.state.action}>Signup</button>
          </form>
          <a style={{marginLeft:'35%'}}>Already a registered User?</a><br></br>
          <NavLink to="/"><button>Login</button></NavLink>
        </div>
    );
  }
}

export default Register;
