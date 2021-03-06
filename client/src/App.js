/* eslint-disable */

import React, { Component } from "react";
import { Route, NavLink, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/register";
import AddProduct from "./components/add-product";
import Home from "./components/Home";
import Login from "./components/login";
import Shop from "./components/shop";
import Cart from "./components/cart";
import Reset from "./components/reset";
import ResetPass from "./components/resetPass";
import axios from "axios";
import ProdDetails from "./components/proddetails";
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/add-product" component={AddProduct} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/products/:slug" component={ProdDetails} />
          <Route exact path="/resetPass/:token" component={ResetPass} />
          <Route exact path="/details/:slug" component={ProdDetails} />
          <Route exact path="/" component={Home} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

//this.setState((state) => ({ value: state.value + 1})); set state calls are async
