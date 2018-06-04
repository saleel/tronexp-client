import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tweets, BuyTron } from './';

const Menu = ({ history }) => {
  const getMenuClass = (pathName, extraClass = '') => {
    if (history.location.pathname === pathName) {
      return `${extraClass} selected`;
    }
    return extraClass;
  };

  return (
    <React.Fragment>
      <h1 className="menu-page-header">Tron Blockchain Explorer</h1>
      <ul className="main-menu">
        <li className={getMenuClass('/', 'selected has-sub-menu active')}>
          <Link to="/">
            <div className="icon-w">
              <div className="os-icon os-icon-link-3" />
            </div>
            <span>Blockchain</span>
          </Link>
          <div className="sub-menu-w">
            <div className="sub-menu-header">Blockchain</div>
            <div className="sub-menu-icon">
              <i className="os-icon os-icon-layout" />
            </div>
            <div className="sub-menu-i">
              <ul className="sub-menu">
                <li>
                  <Link to="/">
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/blocks">
                    <span>Blocks</span>
                  </Link>
                </li>
                <li>
                  <Link to="/transactions">
                    <span>Transactions</span>
                  </Link>
                </li>
                <li>
                  <Link to="/transfers">
                    <span>Transfers</span>
                  </Link>
                </li>
                <li>
                  <Link to="/accounts">
                    <span>Accounts</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li className={getMenuClass('/witnesses')}>
          <Link to="/witnesses">
            <div className="icon-w">
              <div className="os-icon os-icon-crown" />
            </div>
            <span>Representatives</span>
          </Link>
        </li>
        <li className={getMenuClass('/nodes')}>
          <Link to="/nodes">
            <div className="icon-w">
              <div className="os-icon os-icon-grid-squares-2" />
            </div>
            <span>Nodes</span>
          </Link>
        </li>
        <li className={getMenuClass('/tokens')}>
          <Link to="/tokens">
            <div className="icon-w">
              <div className="os-icon os-icon-coins-4" />
            </div>
            <span>Tokens</span>
          </Link>
        </li>
        <li className={getMenuClass('/market')}>
          <Link to="/market">
            <div className="icon-w">
              <div className="os-icon os-icon-bar-chart-stats-up" />
            </div>
            <span>Market</span>
          </Link>
        </li>
      </ul>
    </React.Fragment>
  );
};

Menu.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Menu;
