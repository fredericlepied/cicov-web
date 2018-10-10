import React, { Component } from "react";

export default class Product extends Component {
  render() {
    const { product } = this.props;
    return (
      <div className="product">{product.name ? product.name : product.id}</div>
    );
  }
}
