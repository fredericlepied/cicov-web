import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";
import store from "./store";
import * as Pages from "./pages";
import { setConfig } from "./config/configActions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    store.dispatch(
      setConfig({
        apiURL: "http://localhost:8000/api"
      })
    );
    this.setState({ loading: false });
  }

  render() {
    return (
      <div className="App">
        {this.state.loading ? (
          <Pages.LoadingPage />
        ) : (
          <Provider store={store}>
            <BrowserRouter>
              <Switch>
                <Redirect from="/" exact to="/products" />
                <Route path="/products" exact component={Pages.ProductsPage} />
                <Route path="/products/:id" component={Pages.ProductPage} />
                <Route component={Pages.Page404} />
              </Switch>
            </BrowserRouter>
          </Provider>
        )}
      </div>
    );
  }
}

export default App;
