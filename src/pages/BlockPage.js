import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TransferList, TransactionList, Loading } from '../components';
import api from '../api';
import { formatTime, isTransactionTransfer } from '../utils';

class BlockPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      block: {},
      activeTab: 'transfers',
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    const { match: { params: { blockNumber } = {} } = {} } = this.props;
    this.getData(blockNumber);
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { blockNumber } = {} } = {} } = nextProps;
    this.getData(blockNumber);
  }

  async getData(blockNumber) {
    api.getBlock(blockNumber).then((block) => {
      this.setState({
        block,
        isLoading: false,
      });
    });

    const transfersRes = await api.getTransactions({
      block: blockNumber,
      limit: 1000,
    });
    const transactions = transfersRes.data;
    const transfers = transactions.filter(d => isTransactionTransfer(d));

    this.setState({
      block: {
        ...this.state.block,
        transactions,
        transfers,
      },
    });
  }

  isTab(tabname) {
    return this.state.activeTab === tabname;
  }

  render() {
    const { block, isLoading } = this.state;

    if (isLoading || !block || !block.hash) {
      return (
        <div className="content-box">
          <Loading />
        </div>
      );
    }

    return (
      <div className="content-box">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="block-wrapper">
              <div className="block-box">
                <div className="padded-sm m-b">
                  <div className="centered-header">
                    <h6>{formatTime(block.timestamp)}</h6>
                  </div>
                  <div className="row">
                    <div className="col-6 b-r b-b">
                      <div className="block-widget centered padded-v-big highlight bigger">
                        <div className="label">Block</div>
                        <div className="value">{block.number}</div>
                      </div>
                    </div>
                    <div className="col-6 b-b">
                      <div className="block-widget centered padded-v-big highlight bigger">
                        <div className="label">Transactions</div>
                        <div className="value">{block.transactionsCount}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="padded-sm m-b">
                  <div className="row block-kv">
                    <div className="col">
                      <span>Block Height</span>
                    </div>
                    <div className="col text-right">
                      <span>{block.number}</span>
                    </div>
                  </div>
                  <div className="row block-kv">
                    <div className="col">
                      <span>Hash</span>
                    </div>
                    <div className="col text-right">
                      <span className="hash">{block.hash}</span>
                    </div>
                  </div>
                  <div className="row block-kv">
                    <div className="col">
                      <span>Timestamp</span>
                    </div>
                    <div className="col text-right">
                      <span>{formatTime(block.timestamp)}</span>
                    </div>
                  </div>
                  <div className="row block-kv">
                    <div className="col">
                      <span>Witness</span>
                    </div>
                    <div className="col text-right">
                      <Link to={`/accounts/${block.witnessAddress}`}>
                        <span className="hash">{block.witnessAddress}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="row block-kv">
                    <div className="col">
                      <span>Parent Hash</span>
                    </div>
                    <div className="col text-right">
                      <span className="hash">{block.parentHash}</span>
                    </div>
                  </div>
                  <div className="row block-kv">
                    <div className="col">
                      <span>Size</span>
                    </div>
                    <div className="col text-right">
                      <span>{block.size} Bytes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="tabs-w">
              <div className="tabs-controls">
                <ul className="nav nav-tabs bigger">
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
                        this.isTab('transactions')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      onClick={() => {
                        this.setState({ activeTab: 'transactions' });
                      }}
                    >
                      Transactions
                    </button>
                  </li>
                </ul>
              </div>
              <div className="tab-content pt-3">
                {this.isTab('transfers') && (
                  <div className="row">
                    <div className="col-12">
                      <TransferList transfers={block.transfers} />
                    </div>
                  </div>
                )}
                {this.isTab('transactions') && (
                  <div className="row">
                    <div className="col-12">
                      <TransactionList transactions={block.transactions} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BlockPage.defaultProps = {
  match: { params: { blockNumber: 1 } },
};

BlockPage.propTypes = {
  match: PropTypes.object,
};

export default BlockPage;
