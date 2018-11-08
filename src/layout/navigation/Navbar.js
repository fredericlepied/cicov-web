import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import NavLink from "./NavLink";

export class Navbar extends Component {
  render() {
    const { location } = this.props;
    return (
      <nav className="navbar navbar-default navbar-pf">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link
            to="/products"
            id="navbar-navbar-header__products-link"
            className="navbar-brand"
          >
            CI Coverage
          </Link>
        </div>
        <div className="collapse navbar-collapse navbar-collapse-1">
          <ul className="nav navbar-nav navbar-primary">
            <NavLink id="products" to="/products" location={location}>
              Dashboard
            </NavLink>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
