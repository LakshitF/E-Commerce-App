import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../main.css';
import axios from 'axios';
class Navbar extends Component {

  constructor(props)
  {
    super(props);//never forget or this is undefined
    this.state={log:props.logged};
    this.handleSignout = this.handleSignout.bind(this);

  }

  handleSignout(){
    axios.post('/signout')
    .then((data)=>{ //this dereferencing is super important
      this.setState({log:data.log});
      console.log('Signed out successfully!');
    })
    .catch(err => {
      console.log(err);
      });
  }

  componentDidMount(){
    axios.get('/login')
    .then((data)=>{ //this dereferencing is super important
      this.setState({log:data.data.log});
    })
    .catch(err => {
      console.log(err);
      });
  }

  render() {
    let label;
    if(this.state.log)
    {
      label=<li className="main-header__item"><button onClick={this.handleSignout}><NavLink  to="/signout"> Sign Out </NavLink></button></li>;
    }
    else {
      label=<li className="main-header__item"><NavLink  to="/register">Register/Login</NavLink></li>;
    }

    return (
        <header className="main-header">
            <nav className="main-header__nav">
                <ul className="main-header__item-list">
                    <li className="main-header__item"><NavLink to="/shop">Shop</NavLink></li>
                    <li className="main-header__item"><NavLink  to="/add-product">Add Product</NavLink></li>
                    <li className="main-header__item"><NavLink  to="/cart">My CART</NavLink></li>
                </ul>
                <ul className="main-header__item-list2">
                  {label}
                </ul>
            </nav>
        </header>
    );
  }
}

export default Navbar;
