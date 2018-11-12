import React, { Component } from "react";
import C3Chart from "react-c3js";

export default class RegressionsGraph extends Component {
  render() {
    const { data } = this.props;
    const total =
      data.regressions_in_success +
      data.failed_regressions +
      data.regressions_not_tested;
    const title = total === 1 ? "1 regression" : `${total} regressions`;
    return (
      <C3Chart
        data={{
          colors: {
            Success: "#3f9c35",
            Failure: "#cc0000",
            "Not Tested": "#777777"
          },
          columns: [
            ["Success", data.regressions_in_success],
            ["Failure", data.failed_regressions],
            ["Not Tested", data.regressions_not_tested]
          ],
          type: "donut"
        }}
        donut={{ title: title }}
        legend={{ show: true, position: "bottom" }}
      />
    );
  }
}
