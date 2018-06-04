import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TransferList, Loading, BlockList, TransactionList } from '../components';
import api from '../api';
import { formatTime, isTransactionTransfer } from '../utils';

class AccountPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      account: {},
      activeTab: 'balances',
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

  async getData(address) {
    this.setState({
      isLoading: true,
    });

    const account = await api.getAccount(address);
    this.setState({
      account,
      isLoading: false,
    });

    const [transfersRes, blocksRes] = await Promise.all([
      api.getTransactions({ address, limit: 1000 }),
      api.getBlocks({ witness: address, limit: 50 }),
    ]);

    const transactions = transfersRes.data;
    const fromTransfers = transfersRes.data.filter(d => isTransactionTransfer(d) && d.data.from === address);
    const toTransfers = transfersRes.data.filter(d => isTransactionTransfer(d) && d.data.to === address);
    const blocks = blocksRes.data;
    const totalBlocks = blocksRes.total;

    this.setState({
      account: {
        ...this.state.account,
        transactions,
        blocks,
        totalBlocks,
        fromTransfers,
        toTransfers,
      },
    });
  }

  isTab(tabname) {
    return this.state.activeTab === tabname;
  }

  render() {
    const { isLoading, account } = this.state;

    if (isLoading) {
      return (
        <div className="content-box">
          <Loading />
        </div>
      );
    }

    return (
      <div className="content-box">
        <div className="block-wrapper">
          <div className="block-box p-0 mb-4">
            <div className="row">
              <div className="col-12 text-center b-b p-3 shaded-text">
                Account: {account.address}
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
                  <div className="value xs">{account.bandwidth}</div>
                  <div className="label">Tron Power</div>
                </div>
              </div>
              {/* <div className="col-12 col-sm-3 b-r">
                <div className="block-widget centered padded">
                  <div className="value sm">
                    <span className="icon-up red" />
                    <span>{account.fromTransCount}</span>

                    <span className="icon-down green ml-3" />
                    <span>{account.toTransCount}</span>
                  </div>
                  <div className="label">Transfers</div>
                </div>
              </div> */}
            </div>
          </div>

          <div className="tabs-w">
            <div className="tabs-controls">
              <ul className="nav nav-tabs bigger">
                <li className="nav-item">
                  <button
                    className={
                      this.isTab('balances', true)
                        ? 'nav-link active'
                        : 'nav-link'
                    }
                    onClick={() => {
                      this.setState({ activeTab: 'balances' });
                    }}
                  >
                    Token Balances
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={
                      this.isTab('transfers') ? 'nav-link active' : 'nav-link'
                    }
                    onClick={() => {
                      this.setState({ activeTab: 'transfers' });
                    }}
                  >
                    Transfers
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={
                      this.isTab('transactions') ? 'nav-link active' : 'nav-link'
                    }
                    onClick={() => {
                      this.setState({ activeTab: 'transactions' });
                    }}
                  >
                    Transactions
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={
                      this.isTab('votes') ? 'nav-link active' : 'nav-link'
                    }
                    onClick={() => {
                      this.setState({ activeTab: 'votes' });
                    }}
                  >
                    Votes Given
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={
                      this.isTab('blocks') ? 'nav-link active' : 'nav-link'
                    }
                    onClick={() => {
                      this.setState({ activeTab: 'blocks' });
                    }}
                  >
                    Blocks Produced
                  </button>
                </li>
              </ul>
            </div>
            <div className="tab-content pt-3">
              {this.isTab('balances', true) && (
                <div className="block-box animation-fade-up">
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
              {this.isTab('transfers') && (
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <h6>
                      <span className="icon-up red" />
                      <span>
                        Transfers From ({account.fromTransfers.length})
                      </span>
                    </h6>
                    <TransferList transfers={account.fromTransfers} />
                  </div>
                  <div className="col-12 col-lg-6">
                    <h6>
                      <span className="icon-down green" />
                      <span>Transfers To ({account.toTransfers.length})</span>
                    </h6>
                    <TransferList transfers={account.toTransfers} />
                  </div>
                </div>
              )}
              {this.isTab('transactions') && (
                <div className="row">
                  <div className="col-12">
                    <TransactionList transactions={account.transactions} />
                  </div>
                </div>
              )}
              {this.isTab('votes') && (
                <div className="row">
                  <div className="col-12">
                    <div className="block-box animation-fade-up">
                      {account.votes.length ? (
                        <div className="table-responsive">
                          <table className="table table-lightborder">
                            <thead>
                              <tr>
                                <th style={{ width: '5%' }}>#</th>
                                <th style={{ width: '60%' }}>Address</th>
                                <th style={{ width: '35%' }}>Votes</th>
                              </tr>
                            </thead>
                            <tbody>
                              {account.votes.map((v, i) => (
                                <tr key={v.address}>
                                  <td>{i + 1}</td>
                                  <td>
                                    <Link
                                      to={`/accounts/${v.address}`}
                                      style={{ color: 'inherit' }}
                                    >
                                      {v.address}
                                    </Link>
                                  </td>
                                  <td>{v.votes}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div>No Votes Given</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {this.isTab('blocks') && (
                <div className="row">
                  <div className="col-12">
                    <BlockList blocks={account.blocks} />
                    {account.blocks &&
                      account.blocks.length >= 50 && (
                        <p>
                          Note: Showing most recent 50 of {account.totalBlocks}{' '}
                          blocks only
                        </p>
                      )}
                  </div>
                </div>
              )}
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
