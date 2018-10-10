// -*- rjsx -*-

import React from 'react';
import ProductDetail from '../components/ProductDetail';

class ProductPage extends React.Component {
  render () {
      return (
          <React.Fragment>
            <h1>Product</h1>
            <ProductDetail id={this.props.match.params.id}/>
          </React.Fragment>
      );
  }
}

export { ProductPage }
