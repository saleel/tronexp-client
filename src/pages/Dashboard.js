import React from 'react';
import { Ticker, BlockList, TransactionList, Box } from '../components';
import api from '../api';

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      blocks: null,
      transactions: null,
      ticker: {},
      latestBlockNumber: null,
      witnessesCount: null,
      accountCount: null,
    };
  }

  async componentDidMount() {
    api.getBlocks(8).then((response) => {
      const blocks = response.data;
      this.setState({
        blocks,
        latestBlockNumber: blocks[0].number,
      });
    });

    api.getTransactions(18).then((response) => {
      this.setState({
        transactions: response.data,
        totalTransactions: response.total,
      });
    });

    api.getWitnesses().then((response) => {
      this.setState({
        witnessesCount: response.total,
      });
    });

    api.getAccounts().then((response) => {
      this.setState({
        accountCount: response.total,
      });
    });

    api.getTicker().then((ticker) => {
      this.setState({
        ticker,
      });
    });

    api.getHistoricalPrice().then((priceHistory) => {
      this.setState({
        priceHistory,
      });
    });
  }

  render() {
    const {
      latestBlockNumber,
      blocks,
      transactions,
      ticker,
      priceHistory,
      witnessesCount,
      accountCount,
      totalTransactions,
    } = this.state;

    return (
      <div className="content-box">
        <div className="row mb-4">
          <div className="col-sm-5 col-xxl-4">
            <div className="row">
              <div className="col-sm-6">
                <Box
                  styles={{ height: '130px' }}
                  linkTo={`/blocks/${latestBlockNumber}`}
                  value={latestBlockNumber}
                  label="Latest Block"
                />
              </div>
              <div className="col-sm-6">
                <Box
                  styles={{ height: '130px' }}
                  linkTo="/accounts"
                  value={accountCount}
                  label="Accounts"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <Box
                  styles={{ height: '130px' }}
                  linkTo="/witnesses"
                  value={witnessesCount}
                  label="Representatives"
                />
              </div>
              <div className="col-sm-6">
                <Box
                  styles={{ height: '130px' }}
                  linkTo="/transactions"
                  value={totalTransactions}
                  label="Transactions"
                />
              </div>
            </div>
          </div>
          <div className="col-sm-7 col-xxl-8">
            <Ticker ticker={ticker} priceHistory={priceHistory} />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-5">
            <BlockList blocks={blocks} title="Recent Blocks" />
          </div>
          <div className="col-lg-7">
            <TransactionList transactions={transactions} title="Recent Transactions" />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
