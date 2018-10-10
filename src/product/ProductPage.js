import React, { Component } from "react";

import { MainPage } from "../pages";

export class ProductPage extends Component {
  componentDidMount() {
//    this.props.getProducts();
  }
  render() {
    const { product } = this.props;
    return (
      <MainPage>
        <h1>Details</h1>
      </MainPage>
    );
  }
}

export default ProductPage;
