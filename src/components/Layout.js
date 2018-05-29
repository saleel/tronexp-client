import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tweets from './Tweets';
import BuyTron from './BuyTron';
import Menu from './Menu';

const Layout = ({ children, history }) => (
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

        <h1 className="menu-page-header">Tron Blockchain Explorer</h1>
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
            <div className="block-search autosuggest-search-activator">
              <input placeholder="Start typing to search..." type="text" />
            </div>
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

// <div className="search-with-suggestions-w over-search-field">
//       <div className="search-with-suggestions-modal">
//         <div className="block-search">
//           <input
//             className="search-suggest-input"
//             placeholder="Start typing to search..."
//             type="text"
//           />
//           <div className="close-search-suggestions">
//             <i className="os-icon os-icon-x" />
//           </div>
//         </div>
//         <div className="search-suggestions-group">
//           <div className="ssg-header">
//             <div className="ssg-icon">
//               <div className="os-icon os-icon-box" />
//             </div>
//             <div className="ssg-name">Projects</div>
//             <div className="ssg-info">24 Total</div>
//           </div>
//           <div className="ssg-content">
//             <div className="ssg-items ssg-items-boxed">
//               <a className="ssg-item" href="users_profile_big.html">
//                 {/* <div className="item-media" style="background-image: url(img/company6.png)" /> */}
//                 <div className="item-name">
//                   Integ<span>ration</span> with API
//                 </div>
//               </a>
//               <a className="ssg-item" href="users_profile_big.html">
//                 {/* <div className="item-media" style="background-image: url(img/company7.png)" /> */}
//                 <div className="item-name">
//                   Deve<span>lopm</span>ent Project
//                 </div>
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="search-suggestions-group">
//           <div className="ssg-header">
//             <div className="ssg-icon">
//               <div className="os-icon os-icon-users" />
//             </div>
//             <div className="ssg-name">Customers</div>
//             <div className="ssg-info">12 Total</div>
//           </div>
//           <div className="ssg-content">
//             <div className="ssg-items ssg-items-list">
//               <a className="ssg-item" href="users_profile_big.html">
//                 {/* <div className="item-media" style="background-image: url(img/avatar1.jpg)" /> */}
//                 <div className="item-name">
//                   John Ma<span>yer</span>s
//                 </div>
//               </a>
//               <a className="ssg-item" href="users_profile_big.html">
//                 {/* <div className="item-media" style="background-image: url(img/avatar2.jpg)" /> */}
//                 <div className="item-name">
//                   Th<span>omas</span> Mullier
//                 </div>
//               </a>
//               <a className="ssg-item" href="users_profile_big.html">
//                 {/* <div className="item-media" style="background-image: url(img/avatar3.jpg)" /> */}
//                 <div className="item-name">
//                   Kim C<span>olli</span>ns
//                 </div>
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="search-suggestions-group">
//           <div className="ssg-header">
//             <div className="ssg-icon">
//               <div className="os-icon os-icon-folder" />
//             </div>
//             <div className="ssg-name">Files</div>
//             <div className="ssg-info">17 Total</div>
//           </div>
//           <div className="ssg-content">
//             <div className="ssg-items ssg-items-blocks">
//               <a className="ssg-item" href="#">
//                 <div className="item-icon">
//                   <i className="os-icon os-icon-file-text" />
//                 </div>
//                 <div className="item-name">
//                   Work<span>Not</span>e.txt
//                 </div>
//               </a>
//               <a className="ssg-item" href="#">
//                 <div className="item-icon">
//                   <i className="os-icon os-icon-film" />
//                 </div>
//                 <div className="item-name">
//                   V<span>ideo</span>.avi
//                 </div>
//               </a>
//               <a className="ssg-item" href="#">
//                 <div className="item-icon">
//                   <i className="os-icon os-icon-database" />
//                 </div>
//                 <div className="item-name">
//                   User<span>Tabl</span>e.sql
//                 </div>
//               </a>
//               <a className="ssg-item" href="#">
//                 <div className="item-icon">
//                   <i className="os-icon os-icon-image" />
//                 </div>
//                 <div className="item-name">
//                   wed<span>din</span>g.jpg
//                 </div>
//               </a>
//             </div>
//             <div className="ssg-nothing-found">
//               <div className="icon-w">
//                 <i className="os-icon os-icon-eye-off" />
//               </div>
//               <span>No files were found. Try changing your query...</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
