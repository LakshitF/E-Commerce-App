import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../css/main.css";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";

class ProdDetails extends Component {
  constructor(props)
  {
    super(props);
    this.state={product:{}}
  }
  componentWillMount()
  {
    const { match: { params } } = this.props;

    axios.get(`/api/products/${params.slug}`)
    .then((resp)=>{
      console.log(resp.data.product);
      this.setState({product:resp.data.product});
    })
    .catch(err=>{console.log(err);})
  }
  render() {
    return (
      <div className="cont1">
      <img className="cont2" src={this.state.product.img}/>
      <div className="cont3">
        <h2>{this.state.product.title}</h2>
        <span>{this.state.product.description}</span>
      </div>
      </div>
    );
  }
}

export default ProdDetails;
