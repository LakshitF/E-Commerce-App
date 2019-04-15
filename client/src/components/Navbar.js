import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../css/main.css';
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
    let label2;
    if(this.state.log)
    {
      label=<NavLink  to="/signout"><li className="main-header__item" style={{alignSelf:'right',marginLeft:900}}><button onClick={this.handleSignout}> Sign Out </button></li></NavLink>;
    }
    else {
      label=<li className="main-header__item" style={{alignSelf:'right',marginLeft:900}}><NavLink  to="/register">Register</NavLink></li>;
      label2=<li className="main-header__item" style={{alignSelf:'right'}}><NavLink  to="/login">Login</NavLink></li>;
    }

    return (
        <header className="main-header">
            <nav className="main-header__nav">
                <ul className="main-header__item-list">
                    <li className="main-header__item"><NavLink to="/shop">Shop</NavLink></li>
                    <li className="main-header__item"><NavLink  to="/add-product">Add Product</NavLink></li>
                    <li className="main-header__item"><NavLink  to="/cart">My CART</NavLink></li>
                    {label}
                    {label2}
                </ul>
            </nav>
        </header>
    );
  }
}

export default Navbar;
