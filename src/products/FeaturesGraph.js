import React, { Component } from "react";
import C3Chart from "react-c3js";

export default class RegressionsGraph extends Component {
  render() {
    const { data } = this.props;
    const total =
      data.features_in_success +
      data.failed_features +
      data.features_not_tested;
    const title = total === 1 ? "1 feature" : `${total} features`;
    return (
      <C3Chart
        data={{
          colors: {
            Success: "#3f9c35",
            Failure: "#cc0000",
            "Not Tested": "#777777"
          },
          columns: [
            ["Success", data.features_in_success],
            ["Failure", data.failed_features],
            ["Not Tested", data.features_not_tested]
          ],
          type: "donut"
        }}
        donut={{ title: title }}
        legend={{ show: true, position: "bottom" }}
      />
    );
  }
}
