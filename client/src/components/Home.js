import React, {
  Component
} from "react";
import {
  NavLink
} from "react-router-dom";
import "../css/main.css";
import Script from "react-inline-script";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( <
      div style = {
        {
          display: "flex",
          flexDirection: "column",
          marginBottom: 100
        }
      } >

      <
      img class = "homeimg"
      src = "" /
      >

      <
      span style = {
        {
          alignSelf: "center",
          marginBottom: "8px"
        }
      } >
      Welcome to NODEKART <
      /span> <
      span style = {
        {
          alignSelf: "center",
          marginBottom: "8px"
        }
      } >
      This is a demo application which illustrates an E - Commerce solution
      for <
      br / >
      any online store. <
      /span> <
      div style = {
        {
          display: "flex",
          flexDirection: "row",
          alignSelf: "center"
        }
      } >
      <
      NavLink to = {
        `/shop/?category=TV`
      } >
      <
      div class = "griditem2"
      style = {
        {
          display: "flex",
          flexDirection: "column",
          marginRight: "40px"
        }
      } >
      <
      img src = "../images/cat1.jpg"
      width = {
        135
      }
      height = {
        180
      }
      /> <
      span style = {
        {
          display: "inline-block",
          textAlign: "center",
          fontSize: 18,
          color: "blue"
        }
      } >
      TV <
      /span> <
      /div> <
      /NavLink> <
      NavLink to = {
        `/shop/?category=headphones`
      } >
      <
      div class = "griditem2"
      style = {
        {
          display: "flex",
          flexDirection: "column",
          marginRight: "40px"
        }
      } >
      <
      img src = "../images/cat2.jpg"
      width = {
        135
      }
      height = {
        180
      }
      />

      <
      span style = {
        {
          display: "inline-block",
          fontSize: 18,
          color: "blue",
          textAlign: "center",
          bottom: "1"
        }
      } >
      Headphones <
      /span>

      <
      /div> <
      /NavLink> <
      NavLink to = {
        `/shop/?category=mobiles`
      } >
      <
      div class = "griditem2"
      style = {
        {
          display: "flex",
          flexDirection: "column",
          marginRight: "40px"
        }
      } >
      <
      img src = "../images/cat3.jpg"
      width = {
        135
      }
      height = {
        180
      }
      /> <
      span style = {
        {
          display: "inline-block",
          fontSize: 18,
          color: "blue",
          textAlign: "center",
          bottom: "1"
        }
      } >
      Mobiles <
      /span> <
      /div> <
      /NavLink> <
      /div> <
      /div>
    );
  }
}

export default Home;