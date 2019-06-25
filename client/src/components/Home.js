import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../css/main.css";
import Script from "react-inline-script";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let images = ["/images/backlogin.jpg", "/images/k1.jpg"];
    let i = 0;
    let l = images.length;
    let doc = document.getElementById("back");
    setInterval(function() {
      if (l == i) {
        i = 0;
        doc.src = images[i];
        i++;
      } else {
        doc.src = images[i];
        i++;
        console.log("image changed");
      }
    }, 3000);
  }

  render() {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", marginBottom: 100 }}
      >
        <img
          id="back"
          src=""
          style={{
            display: "inline-block",
            alignSelf: "center",
            justifyContent: "center",
            marginBottom: "40px"
          }}
          width={800}
          height={400}
        />
        <span style={{ alignSelf: "center", marginBottom: "8px" }}>
          Welcome to NODEKART
        </span>
        <span style={{ alignSelf: "center", marginBottom: "8px" }}>
          This is a demo application which illustrates an E-Commerce solution
          for
          <br />
          any online store.
        </span>
        <div
          style={{ display: "flex", flexDirection: "row", alignSelf: "center" }}
        >
          <div
            class="griditem2"
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "40px"
            }}
          >
            <img src="../images/cat1.jpg" width={95} height={180} />
            <span
              style={{
                display: "inline-block",
                fontSize: 18,
                color: "blue"
              }}
            >
              Laptops
            </span>
          </div>
          <div
            class="griditem2"
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "40px"
            }}
          >
            <img src="../images/cat2.jpg" width={110} height={180} />
            <span
              style={{
                display: "inline-block",
                fontSize: 18,
                color: "blue",
                bottom: "1"
              }}
            >
              Headphones
            </span>
          </div>
          <div
            class="griditem2"
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "40px"
            }}
          >
            <img src="../images/cat3.jpg" width={110} height={180} />
            <span
              style={{
                display: "inline-block",
                fontSize: 18,
                color: "blue",
                bottom: "1"
              }}
            >
              Mobiles
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
