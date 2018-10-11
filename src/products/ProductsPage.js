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

    if (products) {
      return (
        <MainPage>
          <ListView>
            {Object.keys(products).map(key => (<Product key={products[key].id} product={products[key]} />))}
        </ListView>
          </MainPage>
      );
    } else {
      return (
        <MainPage>
          <ListView>
            <p>No product available</p>
          </ListView>
          </MainPage>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    products: state.models.products
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
