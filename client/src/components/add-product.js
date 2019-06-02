import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../css/main.css";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

class AddProduct extends Component {
  render() {
    return (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <form action="/add-product" method="POST">
                <TextField
                style={{}}
                name="title"
                label="Title"
                type="email"
                margin="normal"
                />
                <br></br>
                <TextField
                name="price"
                label="Price"
                type="email"
                margin="normal"
                />
                <br></br>
                <TextField
                name="description"
                label="Description"
                type="email"
                margin="normal"
                />
                <br></br>
                <TextField
                name="img"
                label="Image Url"
                type="email"
                margin="normal"
                />
                <br></br><br></br>
              <Button variant="contained" color="primary" type="submit">
                Add Product
              </Button>
          </form>
      </div>
    );
  }
}

export default AddProduct;
