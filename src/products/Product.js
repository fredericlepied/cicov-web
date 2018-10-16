import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ListView, Icon, Row, Col } from "patternfly-react";

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
            {selection}
          </Col>
        </Row>
      </ListView.Item>
    );
  }
}
