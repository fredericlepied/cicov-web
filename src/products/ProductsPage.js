import React, { Component } from "react";
import { connect } from "react-redux";
import { ListView } from "patternfly-react";
import { isEmpty } from "lodash";

import { MainPage } from "../pages";
import { getProducts } from "./productsActions";
import Product from "./Product";

export class ProductsPage extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { products } = this.props;
    if (isEmpty(products)) {
      return (
        <MainPage>
          <ListView>
            <p>No product available</p>
          </ListView>
        </MainPage>
      );
    } else {
      return (
        <MainPage>
          <ListView>
            {Object.values(products).map(product => (
              <Product key={product.id} product={product}  />
            ))}
          </ListView>
        </MainPage>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    products: state.products
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
