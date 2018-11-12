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
  render_jobs(product) {
    const last_build = product.job_results[product.job_results.length - 1].build;
    return product.job_results.filter(jr => jr.build === last_build).map(jr => (
      <tr key={jr.id}>
        <td className="text-center">
        {jr.result === "SUCCESS" ? <span className="label label-success">success</span> : 
         (jr.result === "UNSTABLE" ? (
            <span className="label label-default">unstable</span>
          ) : (
            <span className="label label-danger">failure</span>
          )
        )}
        </td>
        <td><a href={jr.url}>{jr.jobname}</a>{jr.result !== "SUCCESS" ? <ul>{jr.test_results.filter(tr => tr.result === false).map(tr => <li key={tr.id}>{tr.test}</li>)}</ul> : ""}</td>
        </tr>
    ));}
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
            <h3>Jobs for last build ({product.job_results[product.job_results.length - 1].build})</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="text-center">Result</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {this.render_jobs(product)}
              </tbody>
            </table>
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
                  <tr key={rfe.id}>
                    <th>{rfe.id}</th>
                    <td><a href={rfe.url}>{rfe.name}</a></td>
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
