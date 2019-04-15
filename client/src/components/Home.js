import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../css/main.css';
import Script from "react-inline-script";

class Home extends Component {
  constructor(props)
  {
    super(props);
  }


  render() {



    return (
      <div style={{width: '100%',
      height: '100%',
      backgroundImage:"",
      backgroundSize: 'cover',display:'flex'}} id="back">
      <h1>Welcome to BuyIt</h1>
      <Script>
      {`

       var images = ["../images/bg-01.jpg","../images/bg-02.png"];
       var i = 0;
       var renew = setInterval(function(){
           if(links.length == i){
               i = 0;
           }
           else {
           document.getElementById("back").style.backgroundImage = "url(" +images[i]+ ")";
           i++;
           console.log('image changed');
       }
     },2000);
     `}
       </Script>
      </div>

    );
  }
}

export default Home;
