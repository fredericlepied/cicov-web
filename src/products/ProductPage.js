import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";

import { MainPage } from "../pages";
import { getProductDetails } from "./productsActions";
import RegressionsGraph from "./RegressionsGraph";
import FeaturesGraph from "./FeaturesGraph";
import { getStats } from "./stats";

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
        <div className="row">
          <div className="col-xs-12">
            <h2>{product.name}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <h3>Graphs</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            Regressions
            <RegressionsGraph data={getStats(product)} />
          </div>
          <div className="col-xs-12 col-sm-6">
            Features
            <FeaturesGraph data={getStats(product)} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <h3>RFEs</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th className="text-center">Type</th>
                  <th className="text-center">Tested</th>
                </tr>
              </thead>
              <tbody>
                {product.rfes.map(rfe => (
                  <tr>
                    <th>{rfe.id}</th>
                    <td>{rfe.name}</td>
                    <td className="text-center">
                      {rfe.product_id === product.id ? (
                        <span className="label label-success">feature</span>
                      ) : (
                        <span className="label label-primary">regression</span>
                      )}
                    </td>
                    <td className="text-center">
                      {rfe.result.tested ? (
                        rfe.result.result ? (
                          <span className="label label-success">success</span>
                        ) : (
                          <span className="label label-danger">failure</span>
                        )
                      ) : (
                        <span className="label label-default">not tested</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
