import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { ListView } from "patternfly-react";

import { MainPage } from "../pages";
import { getProductDetails } from "./productsActions";
import Product from "./Product";

export class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      product: null,
      error: null
    };
  }
  componentDidMount() {
    const { getProductDetails, match } = this.props;
    getProductDetails(match.params.id)
      .then(response =>
        this.setState({ loading: false, product: response.data })
      )
      .catch(error => this.setState({ loading: false, error: error.message }));
  }
  render() {
    const { loading, error, product } = this.state;
    if (loading) {
      return (
        <MainPage>
          <p>Loading...</p>
        </MainPage>
      );
    }
    if (!loading && error) {
      return (
        <MainPage>
          <p>{error}</p>
        </MainPage>
      );
    }
    if (!loading && !error && isEmpty(product)) {
      return (
        <MainPage>
          <p>There is no product matching </p>
        </MainPage>
      );
    }
    return (
      <MainPage>
        <ListView>
          <Product product={product} />
        </ListView>
      </MainPage>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProductDetails: id => dispatch(getProductDetails({ id }))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(ProductPage);
