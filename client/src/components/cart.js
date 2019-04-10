import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../css/main.css';
import '../App.css';
import axios from 'axios';
import {Alert} from 'react-bootstrap';
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
      <span>Quantity:{props.qty}</span>
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
    this.state={prods:[],alert:''};
  }

  componentDidMount(){
    axios.get('/cart')
    .then(( {data} )=>{ //this dereferencing is super important
      if(data.loggedIn==false){
        this.setState({alert:'<Alert variant=danger> You must be logged in to continue! </Alert>'});
      }

      this.setState({prods:data.cart});
    })
    .catch(err => {
      console.log(err);
      });
  }

  render()
  {
    let items;
    items='';
    let alert=<Alert variant='danger'> You must be logged in to continue! </Alert>;
    if (typeof this.state.prods!=='undefined'){
      items = this.state.prods.map((product,index)=>{
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
    }

    return (
      <div>
      {alert}
      <div className="gridcontainer">
        {items}
      </div>
      </div>
    );
  }
}

export default Cart;
