import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../css/main.css';
import '../App.css';
import axios from 'axios';
import BrowserRouter from 'react-router-dom';
import queryString from 'query-string';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import {Alert} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

function Product(props) {
  return (
    <div className="griditem" style={{width:160,height:340,justifyContent:'center',display:'flex',flexDirection:'column'}}>
    <div style={{alignSelf:'center'}}>
        <img src={props.img} width={140} height={210} style={{alignSelf:'center'}}/>
    </div>
  <div style={{textAlign:'center'}}>
      <span style={{display:'inline-block',fontSize:20,color:'blue'}}>{props.title}</span>
      <br></br>
      <span style={{fontSize:22,display:'inline-block'}}>${props.price}</span>
  </div>
  <div style={{marginBottom:'10px',marginTop:'10px',alignItems:'center',alignSelf:'center'}}>
    <form action="/addToCart" method="post" target="hiddenFrame" >
    <Button variant="contained" color="primary" type="submit">
      Add to Cart
    </Button>
      <input type="hidden" name="productId" value={props._id} />
    </form>
  </div>
  </div>);
}

class Shop extends Component {

  constructor(props)
  {
    super(props);
    this.state={loading:false,prods:[],currentPage:1,previousPage:0,hasPreviousPage:false,hasNextPage:false,lastPage:'',nextPage:2,sort:0};
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

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
      console.log('LOADED');
      this.setState({loading:false,prods:data.prods,currentPage:data.currentPage,previousPage:data.previousPage,nextPage:data.nextPage,hasPreviousPage:data.hasPreviousPage,hasNextPage:data.hasNextPage,lastPage:data.lastPage,sort:0});
    })
    .catch(err => {
      console.log('error1');
      console.log(err);
      });
      this.setState({loading:true});
      console.log('loading');
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
      <div style={{width:1300,height:800}}>

      {this.state.loading===true
        &&
        <div>
        <img src="/images/glow.gif" style={{position:'absolute',width:'70%',height:'70%',alignSelf:'center'}}/>
        </div>
      }
      {
        this.state.loading===false
        &&
        <div style={{display:'flex',flexDirection:'column',marginLeft:250}}>
          <div style={{display:'flex',flexDirection:'row'}}>
          <a style={{float:'left',padding:10,fontWeight:'bold'}}>Sort by Price:</a>
          <a style={{float:'left',padding:10}}><NavLink style={{textDecoration:'none'}} to={`/shop/?page=1&sort=1`}>Low to High</NavLink></a>
          <a style={{float:'left',padding:10}}><NavLink style={{textDecoration:'none'}} to={`/shop/?page=1&sort=-1`}>High to Low</NavLink></a>

          <Select
            onChange={this.handleInputChange}
            name="Category"
            value="afaafad"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Headphones" name="Headphones">Headphones</MenuItem>
            <MenuItem value="Laptops" name="Laptops">Laptops</MenuItem>
            <MenuItem value="Mobile Phones" name="Mobile Phones">Mobile Phones</MenuItem>
          </Select>

          </div>
          <div className="gridcontainer" style={{paddingTop:10}}>
            {items}
          </div>

          <div className="pagination" style={{alignSelf:'center',position:'absolute',bottom:'15%'}}>
            {this.state.previousPage!==0 &&
              <a ><NavLink to={`/shop/?page=${this.state.previousPage}&sort=${this.state.sort}`}>{this.state.previousPage}</NavLink></a>
            }
            <a><NavLink to={`/shop/?page=${this.state.currentPage}&sort=${this.state.sort}` }>{this.state.currentPage}</NavLink></a>
            {this.state.nextPage!==0 &&
              <a ><NavLink to={`/shop/?page=${this.state.nextPage}&sort=${this.state.sort}`}>{this.state.nextPage}</NavLink></a>
            }
          </div>
        </div>
      }

      <iframe name="hiddenFrame" width="0" height="0" border="0" style={{display:'none'}}></iframe>
      </div>
    );
  }
}

export default Shop;
