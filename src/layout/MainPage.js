import React, { Component } from "react";
import Navbar from "./navigation/Navbar";

export default class MainPage extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="MainContent">
        <Navbar />
        <div className="container-fluid">{children}</div>
      </div>
    );
  }
}
