import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { ListView } from "patternfly-react";

import { MainPage } from "../pages";
import { getProductDetails } from "./productsActions";
import { getTests } from "../tests/testsActions";
import Build from "./Build";

export class BuildPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      product: null,
      build: null,
      error: null
    };
  }
  componentDidMount() {
    const { getProductDetails, getTests, match } = this.props;
    getProductDetails(match.params.id)
      .then(response => 
            {this.setState({ loading: false, product: response.data, build: match.params.build });
             const tests = [...new Set(response.data.job_results.reduce((acc, val) => acc.concat(val.test_results.filter(tr => tr.result === false).map(tr => tr.test)), []))];
             getTests(tests);
            }
      )
      .catch(error => this.setState({ loading: false, error: error.message }));
  }
  render() {
    const { loading, error, product, build } = this.state;
    console.log(this.state);
    if (loading) {
      return (
        <MainPage>
          <p>Loading...</p>
        </MainPage>
      );
    }
    if (!loading && error) {
      return (
        <MainPage>
          <p>{error}</p>
        </MainPage>
      );
    }
    if (!loading && !error && isEmpty(product)) {
      return (
        <MainPage>
          <p>There is no product matching </p>
        </MainPage>
      );
    }
    return (
      <MainPage>
        <ListView>
          <Build product={product} build={build} tests={this.props.tests} />
        </ListView>
      </MainPage>
    );
  }
}

function mapStateToProps(state) {
  return {
    tests: state.tests
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProductDetails: id => dispatch(getProductDetails({ id })),
    getTests: ids => dispatch(getTests(ids))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildPage);
