// -*- rjsx -*-

import React from 'react';
import { Link } from 'react-router-dom';
import { ListView } from 'patternfly-react';
import { connect } from 'react-redux';
import { fetchProductsAction } from '../reducers';

class ProductList extends React.Component {
    constructor(props) {
        super();
        props.dispatch(fetchProductsAction());
    }

    render () {
        const itemList = (this.props.products) ? this.props.products.map((item, idx) => ({title: item.name, content: <Link to={ "/product/" + item.id }>{item.name}</Link>})) : [];
      
        return (
            <ListView>
              {itemList.map((item, idx) => (
                  <ListView.Item
                    heading={item.title}
                    hideCloseIcon={true}
                    key={idx}
                    expanded
                    >
                    {item.content}
                  </ListView.Item>
              ))}
            </ListView>
        );
    }
}

// The connect method binds the store status state to
// the component status property.
// When the status changes, the component is automatically updated.
export default connect(
    state => ({
        products: state.info.products
    })
)( ProductList);
