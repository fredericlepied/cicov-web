// -*- rjsx -*-

import React from 'react';
//import { Link } from 'react-router-dom';
import { Table } from 'patternfly-react';
import { connect } from 'react-redux';
import { fetchProductDetailsAction } from '../reducers';

class ProductDetail extends React.Component {
    constructor(props) {
        super();
        props.dispatch(fetchProductDetailsAction(props.id));
    }

    render () {
        if (this.props.details) {
            const headFormat = value => <Table.Heading>{value}</Table.Heading>;
            const cellFormat = (value) => <Table.Cell>{value}</Table.Cell>;

            const columns = [{
                header: {label: 'Title', formatters: [headFormat]},
                property: 'title',
                cell: {formatters: [cellFormat]}
            }, {
                header: {label: 'Content', formatters: [headFormat]},
                property: 'content',
                cell: {formatters: [cellFormat]}
            }];

            const details = this.props.details[this.props.id];
            console.log(details);
            const itemList = Object.keys(details).map((key) => [key, details[key]]);
            console.log(itemList);
            
            return (
                <Table.PfProvider
                  striped
                  bordered
                  hover
                  columns={columns}
                  >
                  <Table.Header/>
                  <Table.Body
                    rows={itemList}
                    rowKey="title"
                    />
                </Table.PfProvider>
            );
        } else {
            return <p>Loading...</p>;
            
        }
    }
}

// The connect method binds the store status state to
// the component status property.
// When the status changes, the component is automatically updated.
export default connect(
    state => ({
        details: state.info.details
    })
)( ProductDetail);
