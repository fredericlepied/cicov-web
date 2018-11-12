import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";

import { MainPage } from "../pages";
import { getProductDetails } from "./productsActions";

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
      .then(response => {
        this.setState({ loading: false, product: response.data });
      })
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
    if (error) {
      return (
        <MainPage>
          <p>{error}</p>
        </MainPage>
      );
    }
    if (isEmpty(product)) {
      return (
        <MainPage>
          <p>There is no product matching</p>
        </MainPage>
      );
    }
    return (
      <MainPage>
        <pre>{JSON.stringify(product, null, 2)}</pre>
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
