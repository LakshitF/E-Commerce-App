import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../main.css';
import axios from 'axios';

class ResetPass extends Component {
  constructor(props)
  {
    super(props);
    this.state={token:''};
  }

  componentDidMount(){
    const token=this.props.match.params;
    console.log(token);
    this.setState({token:token});
  }

  render() {
    return (
      <main>
          <form className="product-form" action="/newPassword" method="POST">
              <div className="form-control">
                  <label for="title">Enter email again</label>
                  <input type="text" name="email"/>
                  <label for="title">New Password</label>
                  <input type="text" name="password" id="password"/>
              </div>
              <input type="hidden" name="token" value="this.state.token"/> //pass to postPassword for auth purpose
              <button type="submit">Update Password</button>
          </form>
      </main>
    );
  }
}

export default ResetPass;
