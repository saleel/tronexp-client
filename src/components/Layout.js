import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tweets from './Tweets';
import BuyTron from './BuyTron';
import Menu from './Menu';
import Search from './Search';

const Layout = ({ children, history, routeTo }) => (
  <div className="all-wrapper solid-bg-all">
    <div className="layout-w">
      <div className="menu-mobile menu-activated-on-click color-scheme-dark">
        <div className="mm-logo-buttons-w">
          <Link to="/" className="mm-logo">
            <span>TRONEXP</span>
          </Link>
          <div className="mm-buttons">
            <div className="content-panel-open">
              <div className="os-icon os-icon-grid-circles" />
            </div>
            <div className="mobile-menu-trigger">
              <div className="os-icon os-icon-hamburger-menu-1" />
            </div>
          </div>
        </div>
        <div className="menu-and-user">
          <Menu history={history} />
        </div>
      </div>

      <div className="menu-w menu-has-selected-link selected-menu-color-bright menu-activated-on-click color-scheme-dark color-style-transparent sub-menu-color-light menu-position-side menu-side-left menu-layout-compact sub-menu-style-inside">
        <div className="logo-w">
          <Link to="/" className="logo">
            <div className="logo-element" />
            <div className="logo-label">TRONEXP</div>
          </Link>
        </div>

        {/* <h1 className="menu-page-header">Tron Blockchain Explorer</h1> */}
        <Menu history={history} />

        <div className="col-12 pt-4">
          <Tweets />
        </div>

        <div className="col-12">
          <BuyTron />
        </div>
      </div>

      <div className="content-w">
        <div className="top-bar color-scheme-dark">
          <div className="top-menu-controls">
            <Search routeTo={routeTo} />
            <Link to="/wallet/new" className="btn btn-white btn-sm mr-2">
              <i className="os-icon os-icon-mail-18" />
              <span>Create Wallet</span>
            </Link>
            <Link to="/wallet" className="btn btn-success btn-sm mr-2">
              <i className="os-icon os-icon-wallet-loaded" />
              <span>Access Wallet</span>
            </Link>
          </div>
        </div>

        <div className="content-i">{children}</div>
      </div>
    </div>
  </div>
);

Layout.propTypes = {
  history: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
