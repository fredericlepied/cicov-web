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
    const data_job_results = {columns: [["Successful Jobs", product.successful_jobs],
                                        ["Unsuccessful Jobs", product.unsuccessful_jobs],
                                       ],
                              colors: {"Successful Jobs": 'green',
                                       "Unsuccessful Jobs": 'red'},
                              order: null};
    const data_rfe_results = {columns: [["Validated", product.successful_rfes],
                                        ["Not tested", product.unsuccessful_rfes],
                                       ],
                              colors: {"Validated": 'green',
                                       "Not tested": 'red'},
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
            {product.successful_rfes + product.unsuccessful_rfes} RFEs
            </ListView.Expand>
          </ListView.InfoItem>,
          <ListView.InfoItem key="job_results">
            <ListView.Expand
              expanded={expanded && selection === "job_results"}
              toggleExpanded={() => this._toggleExpanded("job_results")}
            >
              <Icon name="list" />
              {product.successful_jobs + product.unsuccessful_jobs} Jobs
            </ListView.Expand>
          </ListView.InfoItem>,
          <ListView.InfoItem key="builds">
            <ListView.Expand
              expanded={expanded && selection === "builds"}
              toggleExpanded={() => this._toggleExpanded("builds")}
              >
              <Icon name="list" />
              {product.builds ? product.builds.length : 0} Builds
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
            {selection === "builds" ? <ul>{product.builds.map(b => <li key={b}><Link to={`/build/${product.id}/${b}`}>{b}</Link></li>)}</ul> :
             <DonutChart tooltip={{show: true}}
             title={{type: 'total', secondary: selection === "rfes" ?'RFE' : 'Jobs'}}
                         data={selection === "rfes" ? data_rfe_results : data_job_results} />}
          </Col>
        </Row>
      </ListView.Item>
    );
  }
}
