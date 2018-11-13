import React, { Component } from "react";
import C3Chart from "react-c3js";
import { Link } from "react-router-dom";

export default class Product extends Component {
  render() {
    const { product } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-xs-12">
            <h2 className="h4">
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </h2>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <C3Chart
              data={{
                colors: {
                  Validated: "#3f9c35",
                  "Not Tested": "#777777"
                },
                columns: [
                  ["Validated", product.successful_rfes],
                  ["Not Tested", product.unsuccessful_rfes]
                ],
                type: "donut"
              }}
              donut={{
                title: `${product.successful_rfes +
                  product.unsuccessful_rfes} RFE`
              }}
              legend={{ show: true, position: "bottom" }}
            />
          </div>
          <div className="col-sm-4">
            <C3Chart
              data={{
                colors: {
                  "Successful Jobs": "#3f9c35",
                  "Unsuccessful Jobs": "#cc0000"
                },
                columns: [
                  ["Successful Jobs", product.successful_jobs],
                  ["Unsuccessful Jobs", product.unsuccessful_jobs]
                ],
                type: "donut"
              }}
              donut={{
                title: `${product.successful_jobs +
                  product.unsuccessful_jobs} Jobs`
              }}
              legend={{ show: true, position: "bottom" }}
            />
          </div>
          <div className="col-sm-4" />
        </div>

        <hr />
      </React.Fragment>
    );
  }
}
