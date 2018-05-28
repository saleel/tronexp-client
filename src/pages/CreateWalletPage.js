import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { generateAccount } from '@tronprotocol/wallet-api/src/utils/account';
import api from '../api';

class CreateWalletPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      password: '',
    };

    this.renderGenerateStep = this.renderGenerateStep.bind(this);
    this.onGenerateClick = this.onGenerateClick.bind(this);
    this.renderSaveKeysStep = this.renderSaveKeysStep.bind(this);
    this.renderLoggedInStep = this.renderLoggedInStep.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
  }

  onGenerateClick() {
    const account = generateAccount();
    this.setState({
      address: account.address,
      privateKey: account.privateKey,
      step: 2,
    });
  }

  async onLoginClick() {
    const { address, privateKey } = this.state;
    await api.saveWallet({ address, key: privateKey });

    this.setState({
      step: 3,
    });
  }

  isStep(hash, def = false) {
    if (!window.location.hash) {
      return def;
    }
    return hash === window.location.hash.substr(1);
  }

  renderGenerateStep() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-12 mb-3">
            <p>A new account and private key will be generated for you.</p>
            <p>
              Create a password for your private key. You will need the key and this password to
              unlock the wallet
            </p>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className="form-control"
                type="password"
                value={this.state.password}
                onChange={(e) => {
                  this.setState({
                    password: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </div>

        <div className="text-right mt-3">
          <btn onClick={this.onGenerateClick} className="btn btn-white">
            <i className="os-icon os-icon-mail-18" />
            <span>Create Wallet</span>
          </btn>
        </div>
      </React.Fragment>
    );
  }

  renderSaveKeysStep() {
    const { address, privateKey } = this.state;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12 col-sm-9">
            <p>Your account address is</p>
            <div className="form-group">
              {address && <input className="form-control" type="text" readOnly value={address} />}
            </div>
          </div>
          <div className="col-12 col-sm-9">
            <p>You can access your wallet using the below private key.</p>
            <p className="alert alert-warn">
              Save this key somewhere. If you lose it, you lose your account and all balance in it.
            </p>
            <div className="form-group">
              {privateKey && (
                <input className="form-control" type="text" readOnly value={privateKey} />
              )}
            </div>
          </div>
        </div>

        <div className="text-right mt-3">
          <btn onClick={this.onLoginClick} className="btn btn-white btn-md">
            <i className="os-icon os-icon-wallet-loaded" />
            <span>Login</span>
          </btn>
        </div>
      </React.Fragment>
    );
  }

  renderLoggedInStep() {
    return (
      <div className="row">
        <div className="col-12 col-sm-9">
          <p className="m-0">
            You are now logged in with your newly created wallet. You can access your wallet by
            clicking the below button
          </p>

          <div className="row justify-content-center">
            <Link to="/wallet" className="btn btn-success m-3 align-self-center">
              <i className="os-icon os-icon-wallet-loaded" />
              <span>Access Wallet</span>
            </Link>
          </div>

          <p className="m-0">
            Your keys are saved locally in this browser. However, its safe to logout after every
            use.
          </p>
          <p>You can login again anytime with your saved private key </p>
        </div>
      </div>
    );
  }

  render() {
    const { step } = this.state;

    return (
      <div className="content-box">
        <div className="block-wrapper">
          <div className="block-box">
            <div className="steps-w">
              <div className="step-triggers">
                <a className={step === 1 ? 'step-trigger active' : 'step-trigger'}>Create Wallet</a>
                <a className={step === 2 ? 'step-trigger active' : 'step-trigger'}>Save Keys</a>
                <a className={step === 3 ? 'step-trigger active' : 'step-trigger'}>Access Wallet</a>
              </div>
              <div className="step-contents">
                <div className={step === 1 ? 'step-content active' : 'step-content'}>
                  {this.renderGenerateStep()}
                </div>
                <div className={step === 2 ? 'step-content active' : 'step-content'}>
                  {this.renderSaveKeysStep()}
                </div>
                <div className={step === 3 ? 'step-content active' : 'step-content'}>
                  {this.renderLoggedInStep()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateWalletPage.defaultProps = {};

CreateWalletPage.propTypes = {};

export default CreateWalletPage;
