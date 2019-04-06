import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../main.css';

class Reset extends Component {
  render() {
    return (
      <main>
          <form className="product-form" action="/forgot" method="POST">
              <div className="form-control">
                  <label for="title">Email</label>
                  <input type="text" name="email" id="email"/>
              </div>
              <button type="submit">Send Reset Link</button>
          </form>
      </main>
    );
  }
}

export default Reset;
