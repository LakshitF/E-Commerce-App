import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../css/main.css";
import "../App.css";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

function Product(props) {
  return (
    <div
      className="griditem"
      style={{
        justifyContent: "center",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <img class="imgitem" src={props.img} style={{ alignSelf: "center" }} />
      <div style={{ textAlign: "center" }}>
        <span style={{ display: "inline-block", fontSize: 20, color: "blue" }}>
          {props.title}
        </span>
        <br />
        <span style={{ fontSize: 22, display: "inline-block" }}>
          ${props.price}
        </span>
        <span style={{ fontSize: 14, display: "inline-block" }}>
          ${props.quantity}
        </span>
      </div>
      <div
        style={{
          marginBottom: "10px",
          marginTop: "10px",
          alignItems: "center",
          alignSelf: "center"
        }}
      >
        <form action="/remove" method="post" style={{ alignSelf: "center" }}>
          <Button variant="contained" color="primary" type="submit">
            Remove from Cart
          </Button>
          <input type="hidden" name="productId" value={props._id} />
        </form>
      </div>
    </div>
  );
}

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = { prods: [], alert: "", total: 0 };
    this.getsum = this.getsum.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/cart")
      .then(({ data }) => {
        //this dereferencing is super important
        if (data.loggedIn === false) {
          this.setState({
            alert: "<span> You must be logged in to continue! </span>"
          });
        } else {
          this.setState({ alert: "" });
        }
        console.log("returned cart data");
        console.log(data.cart);
        this.setState({ prods: data.cart });
      })
      .catch(err => {
        console.log("Not Logged In");
        this.setState({
          alert: (
            <span style={{ fontSize: 24, alignSelf: "center" }}>
              {" "}
              You must be logged in to continue!{" "}
            </span>
          )
        });
      });
  }

  getsum() {
    let l = this.state.prods.length;
    let total = 0;
    for (let i = 0; i < l; i++) {
      total =
        total + this.state.prods[i].prodid.price * this.state.prods[i].quantity; //pay attention. From next time, name them well.
    }
    this.setState({ total: total });
    console.log(this.state.total);
  }
  render() {
    //becuse of populate you can access from prodid
    let items;
    items = "";
    if (typeof this.state.prods !== "undefined") {
      items = this.state.prods.map((product, index) => {
        return (
          <Product
            key={index}
            price={product.prodid.price}
            img={product.prodid.img}
            title={product.prodid.title}
            description={product.prodid.description}
            _id={product.prodid._id}
            qty={product.quantity}
          />
        );
      });
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 1366,
          height: 580,
          justifyContent: "center"
        }}
      >
        {this.state.alert}
        <div className="gridcontainer" style={{ paddingTop: 10 }}>
          {items}
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.getsum}
          style={{
            position: "absolute !important",
            width: 200,
            alignSelf: "center"
          }}
        >
          Checkout
        </Button>
        <a style={{ alignSelf: "center", position: "absolute", bottom: 100 }}>
          Cart total {this.state.total}
        </a>
      </div>
    );
  }
}

export default Cart;
