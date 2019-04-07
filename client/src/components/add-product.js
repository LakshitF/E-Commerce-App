import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../css/main.css';
class AddProduct extends Component {
  render() {
    return (
              <form className="product-form" action="/add-product" method="POST">
                  <div className="form-control">
                      <label for="title">Title</label>
                      <input type="text" name="title" id="title"/>
                      <label for="Price">Price</label>
                      <input type="text" name="price" id="price"/>
                      <label for="Price">Image URL </label>
                      <input type="text" name="img" id="img"/>
                      <label for="description">Description </label>
                      <input type="text" name="description" id="description"/>
                      <label for="img">Enter image url </label>
                      <input type="text" name="img" id="img"/>
                  </div>

                  <button type="submit">Add Product</button>
              </form>
    );
  }
}

export default AddProduct;
