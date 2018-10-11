import React, { Component } from "react";
import { connect } from "react-redux";
import { ListView } from "patternfly-react";

import { MainPage } from "../pages";
import { getProductDetails } from "./productActions";

export class ProductPage extends Component {
  componentDidMount() {
    this.props.getProductDetails(this.props.match.params.id);
  }
  render() {
    if (this.props.products && this.props.rfes && this.props.match.params.id in this.props.products) {
      const product = this.props.products[this.props.match.params.id];
      const rfes = this.props.rfes;

      return (
        <MainPage>
          <h1>{ product.name }</h1>
          <ListView>
            {product.rfes.map(id => 
                              (id in rfes) ?
                              <ListView.Item
                                  heading={<React.Fragment>
                                           <a href={ rfes[id].url }>{rfes[id].name}</a>
                                             
                                           </React.Fragment>}
                              hideCloseIcon={true}
                              key={id}
                              expanded
                              >
                                </ListView.Item> : "")
             
            }
          </ListView>
        </MainPage>
      );
    } else {
      return (
        <MainPage>
          <ListView>
            <p>Loading...</p>
          </ListView>
      </MainPage>
    );            
    }
  }
}

function mapStateToProps(state) {
  return {
    products: state.models.products,
    rfes: state.models.rfes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProductDetails: (id) => dispatch(getProductDetails(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPage);

