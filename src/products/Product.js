import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { ListView } from 'patternfly-react';

export default class Product extends Component {
  render() {
    const { product } = this.props;
    return (
      <ListView.Item
        heading={<React.Fragment>
                   <Link to={ "/product/" + product.id }>{product.name}</Link>
                     
                 </React.Fragment>}
        hideCloseIcon={true}
        key={product.id}
        expanded
        >
        {product.rfes.length} RFEs {product.job_results.length} jobs
      </ListView.Item>
    );
  }
}
