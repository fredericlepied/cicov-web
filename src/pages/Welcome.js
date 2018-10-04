// -*- rjsx -*-

import React from 'react';
import ProductList from '../components/ProductList';

class Welcome extends React.Component {
  render () {
      return (
          <React.Fragment>
            <h1>All products</h1>
            <ProductList/>
          </React.Fragment>
      );
  }
}

export { Welcome }
