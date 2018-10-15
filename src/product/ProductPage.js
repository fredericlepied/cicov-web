import React, { Component } from "react";
import { connect } from "react-redux";
import { ListView } from "patternfly-react";

import { MainPage } from "../pages";
import { getProductDetails } from "../api/productActions";

export class ProductPage extends Component {
  componentDidMount() {
    this.props.getProductDetails(this.props.match.params.id);
  }
  render() {
    if (this.props.products && this.props.rfes && this.props.rfe_results && this.props.match.params.id in this.props.products) {
      const product = this.props.products[this.props.match.params.id];
      const rfes = this.props.rfes;
      const jobs = Object.keys(this.props.job_results).filter(id => this.props.job_results[id].product == this.props.match.params.id).map(id => this.props.job_results[id]);
      const builds = Array.from(new Set(jobs.map(job => job.build)));
//      const rfe_results = (product.job_results) ? product.job_results.map(id => this.props.job_results[id].rfe_results) : undefined;

//      console.log('rfe_results');
//      console.log(rfe_results);
      return (
        <MainPage>
          <h1>{ product.name }</h1>
          <h2>Builds</h2>
          <ListView>
            {builds.map(build => 
                              <ListView.Item
                                  heading={<React.Fragment>
                                           <p>{build}</p>
                                           </React.Fragment>}
                              hideCloseIcon={true}
                              key={build}
                              expanded
                              >
                                  <ul>
                                      {jobs.filter(job => (job.build === build)).map(job => <li key={job.id}><a href={job.url}>{job.url}</a></li>)}
                                    </ul>
                                </ListView.Item>)
             
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
    products: state.products,
    rfes: state.rfes,
    job_results: state.job_results,
    rfe_results: state.rfe_results,
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

