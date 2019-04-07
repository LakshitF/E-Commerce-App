import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../css/main.css';

class Home extends Component {
  constructor(props)
  {
    super(props);
  }


  render() {
    return (
      <div style={ { backgroundImage: `url(require("../images/bg-01.jpg"))` } }>
          <form className="product-form" action="/login" method="POST">
              <div className="form-control">
                  <label for="title">Email</label>
                  <input type="text" name="email" id="email"/>
                  <label for="password" type="text">Password</label>
                  <input type="text" name="password"/>
              </div>
              <button type="submit">Login</button>
          </form>
          <form className="product-form" action="/forgot" method="POST">
          <a style={{marginTop:40}}>Forgot your Password? No worries! <br></br></a>
          <label>Enter email </label>
          <input type="text" name="email" id="email"/>
          <button style={{marginLeft:20}} type="submit">Send Reset Link</button>
          </form>
      </div>
    );
  }
}

export default Home;
