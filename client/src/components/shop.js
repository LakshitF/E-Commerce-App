import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../css/main.css';
import '../App.css';
import axios from 'axios';
import BrowserRouter from 'react-router-dom';
import queryString from 'query-string';

function Product(props) {
  return (
    <div className="griditem">
  <article className="productitem">
    <h3 style={{justifyContent:'center'}}>{props.title}</h3>
    <div className="card__image">
        <img src={props.img} width={190} height={230}/>
    </div>
  <div className="card__content">
      <span className="product__price" style={{fontWeight:'bold'}}>${props.price}</span>
      <p className="product__description">{props.description}</p>
  </div>
  <div className="card__actions">
    <form action="/addToCart" method="post">
      <button className="btn" type="submit">Add to Cart</button>
      <input type="hidden" name="productId" value={props._id} />
    </form>
  </div>
  </article>
  </div>);
}

class Shop extends Component {

  constructor(props)
  {
    super(props);
    this.state={prods:[],currentPage:1,previousPage:0,hasPreviousPage:false,hasNextPage:false,lastPage:'',nextPage:2,sort:0};
  }

  componentDidUpdate(){ //Always pay attention to what you read in the post! Read the full post. It was mentioned there to always check if this is the new url before calling set state. That will prevent the infinite loop.
    let flag=0;
    const values=queryString.parse(this.props.location.search);
    let sort=values.sort;
    let handle=values.page;
    if(typeof sort=="undefined")
      sort=1;
    if(typeof handle=="undefined")
      handle=1;

    if(sort!=this.state.sort){
      flag=1;
      console.log('cur url sort is ',values.sort);
    }
    if(handle!=this.state.currentPage){
      flag=1;
      console.log('cur url page is ',values.page);
    }

    console.log('flag is ',flag);
    if(flag==0){
      return;
    }
    axios.get(`/shop/?page=${handle}&sort=${sort}`)  //request
    .then(({data})=>{
      console.log('arrived');
      this.setState({prods:data.prods,
        currentPage:data.currentPage,
        previousPage:data.previousPage,
        nextPage:data.nextPage,
        hasPreviousPage:data.hasPreviousPage,
        hasNextPage:data.hasNextPage,
        lastPage:data.lastPage,
        sort:data.sort
      });
    })
    .catch(err => {
      console.log('error1');
      console.log(err);
      });
  }

  componentDidMount(){
    let sort=this.state.sort;
    const values=queryString.parse(this.props.location.search);
    let handle=values.page;
    if(typeof handle=="undefined")
      handle=1;
    axios.get(`/shop/?page=${handle}&sort=${sort}`)  //request
    .then(({data})=>{
      console.log(data.prods);
      this.setState({prods:data.prods,currentPage:data.currentPage,previousPage:data.previousPage,nextPage:data.nextPage,hasPreviousPage:data.hasPreviousPage,hasNextPage:data.hasNextPage,lastPage:data.lastPage,sort:0});
    })
    .catch(err => {
      console.log('error1');
      console.log(err);
      });
  }


  render()
  {
    let items = this.state.prods.map((product,index)=>{
      return (
        <Product key={index}
        price={product.price}
        img={product.img}
        title={product.title}
        description={product.description}
        _id={product._id}
        />
      );
    });

    return (
      <div style={{display:'flex',flexDirection:'column'}}>
      <div>
      <a style={{float:'left',padding:10}}>Sort by Price ></a>
      <a style={{float:'left',padding:10}}><NavLink to={`/shop/?page=1&sort=1`}>Low to High</NavLink></a>
      <a style={{float:'left',padding:10}}><NavLink to={`/shop/?page=1&sort=-1`}>High to Low</NavLink></a>
      </div>
      <div className="gridcontainer" style={{paddingTop:10,flex:1.1}}>
        <div style={{display:'flex',flexDirection:'row'}}>
          <div>
            <img src=""/>
          </div>
        {items}
        </div>
      </div>
      <div className="pagination" style={{marginLeft:'auto',marginRight:'auto', width: 60, position: 'absolute',bottom:0}}>
        <a ><NavLink to={`/shop/?page=${this.state.previousPage}&sort=${this.state.sort}`}>{this.state.previousPage}</NavLink></a>
        <a><NavLink to={`/shop/?page=${this.state.currentPage}&sort=${this.state.sort}` }>{this.state.currentPage}</NavLink></a>
        <a><NavLink to={`/shop/?page=${this.state.nextPage}&sort=${this.state.sort}` }>{this.state.nextPage}</NavLink></a>
      </div>
      </div>
    );
  }
}

export default Shop;
