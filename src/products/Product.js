import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ListView, Icon, Row, Col, DonutChart } from "patternfly-react";

export default class Product extends Component {
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
    const { product } = this.props;
    const { expanded, selection } = this.state;
    const builds = [...new Set(product.job_results.map(jr => jr.build))].sort().reverse();
    const data_job_results = {columns: [["Jobs", product.job_results.length],
                                       ],
                              order: null};
    const last_jobs = product.job_results.filter(jr => jr.build === builds[0]);
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
              {product.job_results ? product.job_results.length : 0} Jobs
            </ListView.Expand>
          </ListView.InfoItem>,
          <ListView.InfoItem key="builds">
            <ListView.Expand
              expanded={expanded && selection === "builds"}
              toggleExpanded={() => this._toggleExpanded("builds")}
              >
              <Icon name="list" />
              {builds ? builds.length : 0} Builds
            </ListView.Expand>
          </ListView.InfoItem>
        ]}
        heading={product.name}
        stacked={false}
        compoundExpand
        compoundExpanded={expanded}
        onCloseCompoundExpand={() => this.setState({ expanded: false })}
      >
        <Row>
          <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
            {selection === "builds" ? <ul>{builds.map(b => <li key={b}><Link to={`/build/${product.id}/${b}`}>{b}</Link></li>)}</ul> :
             <DonutChart tooltip={{show: true}}
                         title={{type: 'total', secondary: 'RFE'}}
                         data={selection === "rfes" ? data_rfe_results : data_job_results} />}
          </Col>
        </Row>
      </ListView.Item>
    );
  }
}
