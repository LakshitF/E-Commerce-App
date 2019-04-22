import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../css/main.css';
import Script from "react-inline-script";

class Home extends Component {
  constructor(props)
  {
    super(props);
  }

  componentDidMount()
  {
    let images = ["../images/bg-01.jpg","../images/ko.jpg"];
    let i = 0;
    let l=images.length;
    let doc=document.getElementById("back");
    setInterval(function(){
        if(l == i)
        {
            i = 0;
        }
        else
        {
        doc.src =images[i];
        i++;
        console.log('image changed');
        }
      },1500);
      console.log('never reaches here');
  }

  render() {
    return (
      <div style={{display:'flex',flexDirection:'column'}}>
        <img id="back" src="" style={{display:'inline-block',alignSelf:'center',justifyContent:'center',marginBottom:'40px'}} width={800} height={400}/>
        <span style={{alignSelf:'center',marginBottom:'8px'}}>Welcome to NODEKART</span>
        <span style={{alignSelf:'center',marginBottom:'8px'}}>This is a demo application which illustrates an e commerce solution for<br></br>
        any online store. It is built using the MERN stack.
        </span>
        <div style={{display:'flex',flexDirection:'row',alignSelf:'center'}}>
          <div class="griditem2" style={{display:'flex',flexDirection:'column',marginRight:'40px'}}>
            <img src="cat1.jpg" width={75} height={140}/>
            <span style={{fontSize:14,color:'blue',alignSelf:'center'}}>Laptops</span>
          </div>
          <div class="griditem2" style={{display:'flex',flexDirection:'column',marginRight:'40px'}}>
            <img src="cat2.jpg" width={75} height={140}/>
            <span style={{fontSize:14,color:'blue',alignSelf:'center'}}>Apparel</span>
          </div>
          <div class="griditem2" style={{display:'flex',flexDirection:'column',marginRight:'40px'}}>
            <img src="cat3.jpg" width={75} height={140}/>
            <span style={{fontSize:14,color:'blue',alignSelf:'center'}}>Mobiles</span>
          </div>
        </div>

      </div>
    );
  }
}

export default Home;
