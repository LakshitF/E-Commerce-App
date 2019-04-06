import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../main.css';

class Home extends Component {
  constructor(props)
  {
    super(props);
  }


  render() {
    return (
      <div>
          <form className="product-form" action="/login" method="POST">
              <div className="form-control">
                  <label for="title">Email</label>
                  <input type="text" name="email" id="email"/>
                  <label for="password" type="text">Password</label>
                  <input type="text" name="password"/>
              </div>
              <button type="submit">Login</button>
              <button><NavLink to="/">Forgot Password?</NavLink></button>
          </form>
      </div>
    );
  }
}

export default Home;
