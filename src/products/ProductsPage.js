import React, { Component } from "react";
import { connect } from "react-redux";
import { ListView } from "patternfly-react";

import { MainPage } from "../pages";
import { getProducts } from "./productsActions";
import Product from "./Product";

export class ProductsPage extends Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const { products } = this.props;
    return (
      <MainPage>
        <ListView>
          {products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </ListView>
      </MainPage>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: Object.values(state.products)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => dispatch(getProducts())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPage);
