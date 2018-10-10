// -*- rjsx -*-

import React from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import { Masthead } from 'patternfly-react';
import 'patternfly/dist/css/patternfly.min.css';
import 'patternfly/dist/css/patternfly-additions.min.css';

import { ProductPage } from './pages/ProductPage';

//import logo from './images/logo.png'
// Routes can be defined using custom array, store it in a dedicated module.
import { routes } from './routes';

class App extends React.Component {
    constructor () {
        super();
        this.menu = routes();
    }
    
    // Automatically render a menu with buttons for route with a title.
    renderMenu() {
        const { location } = this.props;
        const activeItem = this.menu.find(
            item => location && location.pathname === item.to
        );
        return (
            <ul className="nav navbar-nav navbar-primary">
              {this.menu.filter(item => item.title).map(item => (
                  <li key={item.to} className={item === activeItem ? 'active' : ''}>
                    <Link to={item.to}>{item.title}</Link>
                  </li>
              ))}
            </ul>
        );
  }

    // Automatically render the Switch and Route from the routes custom array.
    renderContent() {
        const allRoutes = [];
        this.menu.map((item, index) => {
            allRoutes.push(
                <Route key={index} exact
                       path={item.to}
                       component={item.component} />
            );
            return allRoutes;
        });
        return (
            <Switch>
              {allRoutes}
              <Route path="/product/:id" render={props => <ProductPage {...props } />} />
              <Redirect from="*" to="/" key="default-route" />
            </Switch>
        );
    }

    // Render the body of the application.
    render() {
        return (
            <BrowserRouter>
              <React.Fragment>
                <Masthead
                  navToggle
                  thin
                  >
                  <div className="collapse navbar-collapse">
                    {this.renderMenu()}
                    <ul className="nav navbar-nav navbar-utility">
                      <li>
                      <a href="https://docs.example.com/"
                         rel="noopener noreferrer" target="_blank">
                        Documentation
                      </a>
                      </li>
                    </ul>
                  </div>
                </Masthead>
                <div className="container-fluid container-cards-pf">
                  {this.renderContent()}
                </div>
              </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
