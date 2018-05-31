import React from 'react';
import { Ticker, Box, Loading } from '../components';
import api from '../api';

class MarketPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ticker: {},
      markets: null,
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

    api.getMarketData(10).then((response) => {
      this.setState({
        markets: response.data,
      });
    });
  }

  render() {
    const { ticker, priceHistory, markets } = this.state;

    return (
      <div className="content-box">
        <div className="row">
          <div className="col-12 mb-5">
            <Ticker ticker={ticker} priceHistory={priceHistory} />
          </div>

          <div className="col-12">
            {!markets ? (
              <Loading />
            ) : (
              <div className="block-wrapper">
                <h6 className="block-header">Top Exchanges/Pairs</h6>
                <div className="block-box">
                  <div className="table-responsive">
                    <table className="table table-lightborder">
                      <thead>
                        <tr>
                          <th>Exchange</th>
                          <th className="text-center">Price</th>
                          <th className="text-center">24H Volume</th>
                          <th className="text-right">Volume Share</th>
                        </tr>
                      </thead>
                      <tbody>
                        {markets.map(m => (
                          <tr>
                            <td>{m.exchange}</td>
                            <td className="text-center">{m.price}</td>
                            <td className="text-center">{m.volume24}</td>
                            <td className="text-right">{m.volumePercent}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MarketPage;
