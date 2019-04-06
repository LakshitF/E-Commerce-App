import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../main.css';
import '../App.css';
import axios from 'axios';

function Product(props) {
  return (
    <div className="griditem">
  <article className="productitem">
    <h3 style={{justifyContent:'center',alignItems: 'center'}}>{props.title}</h3>
    <div className="card__image">
        <img src={props.img} width={190} height={230}/>
    </div>
  <div className="card__content">
      <span className="product__price" style={{fontWeight:'bold'}}>${props.price}</span>
      <br></br>
      <span>Quantity: ${props.qty}</span>
      <p className="product__description">{props.description}</p>
  </div>
  <div className="card__actions">
    <form action="/remove" method="post">
      <button className="btn" type="submit">Remove from Cart</button>
      <input type="hidden" name="productId" value={props._id} />
    </form>
  </div>
  </article>
  </div>);
}

class Cart extends Component {

  constructor(props)
  {
    super(props);
    this.state={prods:[]};
  }

  componentDidMount(){
    axios.get('/cart')
    .then(( {data} )=>{ //this dereferencing is super important
      this.setState({prods:data.cart});
    })
    .catch(err => {
      console.log(err);
      });
  }

  render()
  {

    let items = this.state.prods.map((product,index)=>{
      return (
        <Product key={index}
        price={product.prodid.price}
        img={product.prodid.img}
        title={product.prodid.title}
        description={product.prodid.description}
        _id={product._id}
        qty={product.quantity}
        />
      );
    });

    console.log('items are');
    console.log(items);

    return (
      <div>
      <div className="gridcontainer">
        {items}
      </div>
      </div>
    );
  }
}

export default Cart;
