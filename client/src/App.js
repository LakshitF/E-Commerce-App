import React, { Component } from 'react';
import {Route,NavLink,BrowserRouter} from "react-router-dom";
import Navbar from './components/Navbar';
import Register from './components/register';
import AddProduct from './components/add-product';
import Home from './components/login';
import Shop from './components/shop';
import Cart from './components/cart';
import Reset from './components/reset';
import ResetPass from './components/resetPass';
import axios from 'axios';
import ChatRoom from './components/chatRoom';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Route exact path='/'component={Home}/>
        <Route exact path='/register'component={Register}/>
        <Route exact path='/add-product'component={AddProduct}/>
        <Route exact path='/shop'component={Shop}/>
        <Route exact path='/cart'component={Cart}/>
        <Route exact path='/reset'component={Reset}/>
        <Route exact path='/resetPass/:token' component={ResetPass}/>
        <Route exact path='/chatRoom' component={ChatRoom}/>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;

//this.setState((state) => ({ value: state.value + 1})); set state calls are async
