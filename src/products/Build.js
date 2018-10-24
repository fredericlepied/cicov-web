import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ListView, Icon, Row, Col, DonutChart } from "patternfly-react";

export default class Build extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      selection: null
    };
  }

  _toggleExpanded = selection => {
    this.setState(prevState => {
      if (selection === prevState.selection) {
        return { expanded: !prevState.expanded };
      } else {
        return { expanded: true, selection };
      }
    });
  };

  render() {
    const { product, build, tests } = this.props;
    const { expanded, selection } = this.state;
    const last_jobs = product.job_results.filter(jr => jr.build === build);
    const successful_rfe_results = last_jobs.map(jr => jr.rfe_results.filter(res => res.result === true)).reduce((acc, val) => [...acc, ...val], []).reduce((a, v) => {a[v.rfe] = v; return a;}, {});
    const rfe_success = Object.keys(successful_rfe_results);
    const data_rfe_results = {columns: [["Validated", rfe_success.length],
                                        ["Not tested", product.rfes.length - rfe_success.length],
                                       ],
                              colors: {"Validated": 'green', "Not tested": 'red'},
                              groups: [['validated', 'not-tested']],
                             };

    return (
      <ListView.Item
        checkboxInput={
          <Link to={`/products/${product.id}`} className="navbar-brand">
            <Icon name="link" />
          </Link>
        }
        additionalInfo={[
          <ListView.InfoItem key="rfes">
            <ListView.Expand
              expanded={expanded && selection === "rfes"}
              toggleExpanded={() => this._toggleExpanded("rfes")}
            >
            <Icon name="bug" />
            {product.rfes ? product.rfes.length : 0} RFEs
            </ListView.Expand>
          </ListView.InfoItem>,
          <ListView.InfoItem key="job_results">
            <ListView.Expand
              expanded={expanded && selection === "job_results"}
              toggleExpanded={() => this._toggleExpanded("job_results")}
            >
              <Icon name="list" />
              {product.job_results ? last_jobs.length : 0} Jobs
            </ListView.Expand>
          </ListView.InfoItem>,
        ]}
        heading={product.name + " build " + build}
        stacked={false}
        compoundExpand
        compoundExpanded={expanded}
        onCloseCompoundExpand={() => this.setState({ expanded: false })}
      >
        <Row>
          <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
            {selection === "rfes" ? <DonutChart tooltip={{show: true}}
             id={"donut-" + selection}
             title={{type: 'total', secondary: selection}}
             data={data_rfe_results} /> : <ul>{last_jobs.map(b => <li key={b.url}><a href={b.url}>{b.url}</a> [{b.result}] ({Object.keys(b.test_results).length} tests: {Object.keys(b.test_results.filter(tr => tr.result === true)).length} success {Object.keys(b.test_results.filter(tr => tr.result === false)).length} failures) {b.result === "UNSTABLE" ? <ul>{b.test_results.filter(tr => tr.result===false).map(tr => <li key={tr.id}>{(tr.test in tests) ? tests[tr.test].name : tr.test}</li>)}</ul> : ""}</li>)}</ul>}
          </Col>
        </Row>
      </ListView.Item>
    );
  }
}
