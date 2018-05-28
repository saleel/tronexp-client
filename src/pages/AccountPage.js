import React from 'react';
import PropTypes from 'prop-types';
import { TransactionList, Loading } from '../components';
import api from '../api';
import { formatTime } from '../utils';

class AccountPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      account: {},
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    const { match: { params: { address } = {} } = {} } = this.props;
    this.getData(address);
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { address } = {} } = {} } = nextProps;
    this.getData(address);
  }

  getData(address) {
    api.getAccount(address).then((account) => {
      this.setState({
        account,
      });
    });
  }

  isTab(hash, def = false) {
    if (!window.location.hash) {
      return def;
    }
    return hash === window.location.hash.substr(1);
  }

  render() {
    const { account } = this.state;

    if (!account || !account.address) {
      return (
        <div className="content-box">
          <Loading />
        </div>
      );
    }

    let set1;
    let set2;
    const { transactions } = account;
    if (transactions && transactions.length > 0) {
      set1 = transactions.slice(0, transactions.length / 2);
      set2 = transactions.slice(transactions.length / 2, transactions.length);
    }

    return (
      <div className="content-box">
        <div className="block-wrapper">
          <div className="block-box p-0 mb-4">
            <div className="row">
              <div className="col-12 col-sm-4 b-r">
                <div className="block-widget centered padded">
                  <div className="value xs">{account.name}</div>
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

          <div className="os-tabs-w">
            <div className="os-tabs-controls">
              <ul className="nav nav-tabs bigger">
                <li className="nav-item">
                  <a
                    className={this.isTab('balances', true) ? 'nav-link active' : 'nav-link'}
                    href="#balances"
                  >
                    Token Balances
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={this.isTab('transactions') ? 'nav-link active' : 'nav-link'}
                    href="#transactions"
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
        </div>
      </div>
    );
  }
}

AccountPage.defaultProps = {
  match: { params: { blockNumber: 1 } },
};

AccountPage.propTypes = {
  match: PropTypes.object,
};

export default AccountPage;
