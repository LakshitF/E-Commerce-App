import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../css/main.css';
let bg=require('../public/images/bg-01.jpg');

const divStyle = {
  width: '88%',
  height: '800px',
  backgroundImage:"url("+bg+")",
  backgroundSize: 'cover'
};

class Home extends Component {
  constructor(props)
  {
    super(props);
  }


  render() {
    return (
      <div style={{divStyle}}>
          <form style={{marginTop:30}} className="product-form" action="/login" method="POST">
              <div className="form-control">
                  <label for="title">Email</label>
                  <input type="text" name="email" id="email"/>
                  <label for="password" type="text">Password</label>
                  <input type="text" name="password"/>
              </div>
              <button type="submit">Login</button>
          </form>
          <form style={{marginTop:50}} className="product-form" action="/forgot" method="POST">
          <a  style={{ display:'inline-block',marginTop:20,marginBottom:20}}>Forgot your Password? No worries!</a> <br></br>
          <label>Enter email </label>
          <input type="text" name="email" id="email"/>
          <button style={{marginLeft:20}} type="submit">Send Reset Link</button>
          </form>
      </div>
    );
  }
}

export default Home;
