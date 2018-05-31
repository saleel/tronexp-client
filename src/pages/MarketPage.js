import React from 'react';
import { Ticker, Box } from '../components';
import api from '../api';

class MarketPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ticker: {},
    };
  }

  async componentDidMount() {
    api.getTicker().then((ticker) => {
      this.setState({
        ticker,
      });
    });

    api.getHistoricalPrice(31).then((priceHistory) => {
      this.setState({
        priceHistory,
      });
    });
  }

  render() {
    const { ticker, priceHistory } = this.state;

    return (
      <div className="content-box">
        <div className="row">
          <div className="col-sm-12">
            <Ticker ticker={ticker} priceHistory={priceHistory} />
          </div>
        </div>
      </div>
    );
  }
}

export default MarketPage;
