import React from 'react';
import QRious from 'qrious';
import { TransactionList, Loading } from '../components';
import api from '../api';

class WalletPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      account: null,
      privateKey: '',
      activeTab: 'balances',
    };

    this.qrElement = React.createRef();

    this.renderLoginForm = this.renderLoginForm.bind(this);
    this.onAccessClick = this.onAccessClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  async componentDidMount() {
    const wallet = await api.getWallet();
    this.getAccount(wallet);
  }

  onAccessClick() {
    const wallet = api.saveWallet(this.state.privateKey);
    if (wallet && wallet.address) {
      this.getAccount(wallet);
    }
  }

  onLogoutClick() {
    api.removeWallet();
    window.location.reload(true);
  }

  async getAccount(wallet) {
    let account = {};
    if (wallet && wallet.address) {
      account = await api.getAccount(wallet.address);
    }
    this.setState({
      account,
    });

    const qr = new QRious({
      element: this.qrElement.current,
      value: account.address,
      size: 150,
    });
  }

  isTab(tabname) {
    return this.state.activeTab === tabname;
  }

  renderLoginForm() {
    return (
      <div className="content-box">
        <div className="block-wrapper">
          <div className="block-box">
            <h6 className="block-header">Access Wallet</h6>
            <div className="form-group">
              <label htmlFor="key">Private Key</label>
              <input
                id="key"
                className="form-control"
                type="password"
                value={this.state.privateKey}
                onChange={(e) => {
                  this.setState({
                    privateKey: e.target.value,
                  });
                }}
              />
            </div>
            <div className="text-right mt-3">
              <button onClick={this.onAccessClick} className="btn btn-success align-self-center">
                <i className="os-icon os-icon-wallet-loaded" />
                <span>Access Wallet</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { account } = this.state;

    if (!account) {
      return (
        <div className="content-box">
          <Loading />
        </div>
      );
    }

    if (!account.address) {
      return this.renderLoginForm();
    }

    let set1;
    let set2;
    const { transactions } = account;

    if (transactions && transactions.length > 0) {
      set1 = transactions.slice(0, transactions.length / 2);
      set2 = transactions.slice(transactions.length / 2, transactions.length);
    }

    const availableTokens = account.tokenBalances.length
      ? account.tokenBalances
      : [{ name: 'TRX', balance: 0 }];

    return (
      <div className="content-box">
        <div className="block-wrapper">
          <div className="block-box p-0 mb-4">
            <div className="row">
              <div className="col-12 text-center b-b p-3 shaded-text">
                Wallet Address: {account.address}
              </div>
              <div className="col-12 col-sm-4 b-r">
                <div className="block-widget centered padded">
                  <div className="value xs">{account.name || '-'}</div>
                  <div className="label">Name</div>
                </div>
              </div>
              <div className="col-12 col-sm-4 b-r">
                <div className="block-widget centered padded">
                  <div className="value xs">{account.trxBalance}</div>
                  <div className="label">TRX</div>
                </div>
              </div>
              <div className="col-12 col-sm-4 b-r">
                <div className="block-widget centered padded">
                  <div className="value sm">
                    <span className="icon-up red" />
                    <span>{account.fromTransCount}</span>

                    <span className="icon-down green ml-3" />
                    <span>{account.toTransCount}</span>
                  </div>
                  <div className="label">Transactions</div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-12">
              <p className="alert alert-danger" role="alert">
                Do not send actual TRX to this address from your wallet or from an exchange. This
                account belongs to the tesntet.
              </p>
            </div>

            <div className="col-12 col-sm-6">
              <div className="block-box">
                <h6 className="block-header">Send</h6>

                <div className="form-group row">
                  <label className="col-form-label col-sm-4" htmlFor="sendToken">
                    Token
                  </label>
                  <div className="col-sm-8">
                    <select
                      id="sendToken"
                      className="form-control"
                      placeholder="Recepient Address"
                      type="text"
                    >
                      {availableTokens.map(t => (
                        <option key={t.name} value={t.name}>
                          {t.name} ({t.balance} Available)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-form-label col-sm-4" htmlFor="sendTo">
                    To
                  </label>
                  <div className="col-sm-8">
                    <input
                      id="sendTo"
                      className="form-control"
                      placeholder="Recepient Address"
                      type="text"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-form-label col-sm-4" htmlFor="sendAmount">
                    Amount
                  </label>
                  <div className="col-sm-8">
                    <input
                      id="sendAmount"
                      className="form-control"
                      placeholder="Amount in TRX"
                      type="number"
                    />
                  </div>
                </div>

                <hr />

                <div className="form-buttons-w row">
                  <div className="col">
                    <button className="btn btn-white float-right" type="submit">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <div className="block-box">
                <h6 className="block-header">Receive</h6>
                <p>
                  Send TRX (testnet) to the address shown above. You can get the address by scanning
                  the below QR code.
                </p>
                <canvas ref={this.qrElement} />
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <div className="block-box">
                <h6 className="block-header">Freeze Balance</h6>
                <p>Freeze your balance to vote for Super Representative.</p>
                {/* <p>Tron Power: 0, Bandwidth: 0</p> */}

                <div className="form-group row">
                  <label className="col-form-label col-sm-4" htmlFor="amountFreeze">
                    Amount to Freeze
                  </label>
                  <div className="col-sm-8">
                    <input
                      id="amountFreeze"
                      className="form-control"
                      placeholder="Amount in TRX"
                      type="number"
                    />
                  </div>
                </div>

                <hr />

                <div className="form-buttons-w row">
                  <div className="col">
                    <button className="btn btn-white float-right" type="submit">
                      Freeze
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <div className="block-box">
                <h6 className="block-header">Apply to be a Super Representative</h6>
                <p>This involves a fee of 9,999 TRX.</p>

                <div className="form-group row">
                  <label className="col-form-label col-sm-4" htmlFor="srUrl">
                    Website Url
                  </label>
                  <div className="col-sm-8">
                    <input
                      id="srUrl"
                      className="form-control"
                      placeholder="Amount in TRX"
                      type="text"
                    />
                  </div>
                </div>

                <hr />

                <div className="form-buttons-w row">
                  <div className="col">
                    <button className="btn btn-white float-right" type="submit">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tabs-w">
            <div className="tabs-controls">
              <ul className="nav nav-tabs bigger">
                <li className="nav-item">
                  <a
                    className={this.isTab('balances', true) ? 'nav-link active' : 'nav-link'}
                    onClick={() => {
                      this.setState({ activeTab: 'balances' });
                    }}
                  >
                    Token Balances
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={this.isTab('transactions') ? 'nav-link active' : 'nav-link'}
                    onClick={() => {
                      this.setState({ activeTab: 'transactions' });
                    }}
                  >
                    Transactions
                  </a>
                </li>
              </ul>
            </div>
            <div className="tab-content pt-3">
              {this.isTab('balances', true) && (
                <div className="block-box">
                  {account.tokenBalances.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-lightborder">
                        <thead>
                          <tr>
                            <th>Token Name</th>
                            <th>Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {account.tokenBalances.map(t => (
                            <tr key={t.name}>
                              <td>{t.name}</td>
                              <td>{t.balance}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="m-0">No Tokens found</p>
                  )}
                </div>
              )}
              {this.isTab('transactions') &&
                (transactions ? (
                  transactions.length ? (
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <TransactionList transactions={set1} />
                      </div>
                      <div className="col-12 col-lg-6">
                        <TransactionList transactions={set2} />
                      </div>
                    </div>
                  ) : (
                    <div className="block-box">
                      <p className="m-0">No transactions found</p>
                    </div>
                  )
                ) : (
                  <Loading />
                ))}
            </div>
          </div>

          <div className="row">
            <div className="col mt-3">
              <button className="btn btn-danger btn-md float-right" onClick={this.onLogoutClick}>
                <i className="os-icon os-icon-cancel-circle" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

WalletPage.defaultProps = {};

WalletPage.propTypes = {};

export default WalletPage;
