import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../css/main.css';
import '../App.css';
import axios from 'axios';
import {Alert} from 'react-bootstrap';

function Product(props) {
  return (
    <div className="griditem">
    <div>
        <img src={props.img} width={190} height={250}/>
    </div>
  <div style={{textAlign:'center'}}>
      <span style={{display:'inline-block',fontSize:22}}>{props.title}</span>
      <br></br>
  </div>
  <span style={{marginBottom:'10px',fontSize:18}}>{props.qty}</span>
  <br></br>
  <span style={{fontSize:20}}>${props.price}</span>
  <div className="card__actions">
    <form action="/remove" method="post">
      <button className="btn" type="submit">Remove from Cart</button>
      <input type="hidden" name="productId" value={props._id} />
    </form>
  </div>
  </div>);
}

class Cart extends Component {

  constructor(props)
  {
    super(props);
    this.state={prods:[],alert:'',total:0};
    this.getsum=this.getsum.bind(this);
  }

  componentDidMount(){
    axios.get('/cart')
    .then(( {data} )=>{ //this dereferencing is super important
      if(data.loggedIn==false){
        this.setState({alert:'<Alert variant=danger> You must be logged in to continue! </Alert>'});
      }
      else{
        this.setState({alert:''});
      }

      this.setState({prods:data.cart});
    })
    .catch(err => {
      console.log(err);
      });
  }

  getsum(){
    let l=this.state.prods.length;
    let total=0;
    for(let i=0;i<l;i++)
    {
      total=total+ (this.state.prods[i].prodid.price * this.state.prods[i].quantity); //pay attention. From next time, name them well.

    }
    this.setState({total:total});
    console.log(this.state.total);
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
      <div style={{display:'flex',flexDirection:'column'}}>
      {alert}
      <div className="gridcontainer" style={{paddingTop:10,marginRight:400}}>
        {items}
      </div>
      <button onClick={this.getsum} style={{alignSelf:'center'}}>Get Cart total</button>
      <a style={{alignSelf:'center',position: 'absolute',bottom:0}}>Cart total {this.state.total}</a>
      </div>
    );
  }
}

export default Cart;
