import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";

import { MainPage } from "../pages";
import { getProducts } from "./productsActions";
import Product from "./Product";

export class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.props.getProducts().then(() => this.setState({ loading: false }));
  }

  render() {
    const { products } = this.props;
    const { loading } = this.state;

    if (!loading && isEmpty(products)) {
      return (
        <MainPage>
          <p>No product available</p>
        </MainPage>
      );
    }

    const productList = Object.values(products)
      .sort((p1, p2) => p1.id < p2.id)
      .map(product => <Product key={product.id} product={product} />);

    return (
      <MainPage>
        <div className="row">
          <div className="col-sm-8 col-md-9" style={{ minHeight: "100vh" }}>
            <div className="page-header page-header-bleed-right">
              <h1>Dashboard</h1>
            </div>
            {loading ? <p>Loading...</p> : productList}
          </div>
          <div
            className="col-sm-4 col-md-3 sidebar-pf sidebar-pf-right"
            style={{ minHeight: "100vh" }}
          >
            <div class="sidebar-header sidebar-header-bleed-left sidebar-header-bleed-right">
              <h2 class="h5">Latest Notifications</h2>
            </div>
          </div>
        </div>
      </MainPage>
    );
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
