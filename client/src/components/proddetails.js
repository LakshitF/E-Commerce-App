import React, {
  Component
} from "react";
import {
  NavLink
} from "react-router-dom";
import "../css/main.css";
import Button from '@material-ui/core/Button';
import {
  withStyles
} from '@material-ui/core/styles';
import axios from "axios";

class ProdDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }
  componentWillMount() {
    const {
      match: {
        params
      }
    } = this.props;

    axios.get(`/api/products/${params.slug}`)
      .then((resp) => {
        console.log(resp.data.product);
        this.setState({
          product: resp.data.product
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return ( <
      div className = "cont1" >
      <
      img className = "cont2"
      src = {
        this.state.product.img
      }
      /> <
      div className = "cont3" >
      <
      h2 > {
        this.state.product.title
      } < /h2> <
      span > {
        this.state.product.description
      } < /span>

      <
      div class = "prodform" >
      <
      form action = "/addToCart"
      method = "post"
      target = "hiddenFrame" >
      <
      Button variant = "contained"
      color = "primary"
      type = "submit" >
      Add to Cart <
      /Button> <
      input type = "hidden"
      name = "productId"
      value = {
        props._id
      }
      /> <
      /form> <
      /div> <
      /div> <
      /div>
    );
  }
}

export default ProdDetails;
