import React from 'react';
import api from '../api';
import { formatTime } from '../utils';

class TokensListPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tokens: [],
    };
  }

  async componentDidMount() {
    const response = await api.getTokens(20);
    const tokens = response.data;

    this.setState({ tokens });
  }

  abbreviateNumber(value) {
    let newValue = value;
    let shortNum;
    if (value >= 1000) {
      const suffixes = ['', 'K', 'M', 'B', 'T', 'Q'];
      const suffixNum = Math.floor(`${value}`.length / 3);
      let shortValue = '';
      for (let precision = 2; precision >= 1; precision--) {
        shortValue = parseFloat((suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(precision));
        const dotLessShortValue = `${shortValue}`.replace(/[^a-zA-Z 0-9]+/g, '');
        if (dotLessShortValue.length <= 2) {
          break;
        }
      }
      if (shortValue % 1 !== 0) {
        shortNum = shortValue.toFixed(1);
      }
      newValue = shortValue + suffixes[suffixNum];
    }
    return newValue;
  }

  render() {
    const { tokens } = this.state;

    return (
      <div className="content-box">
        <div className="padded-sm">
          <div className="row">
            {tokens.map(t => (
              <div className="col-12 col-sm-6 col-lg-4" key={t.name}>
                <div className="block-box">
                  <div className="centered-header m-b">
                    <h5>{t.name}</h5>
                    <div className="description m-b">{t.description}</div>
                  </div>

                  <div className="row m-b">
                    <div className="col-6 b-r b-b">
                      <div className="block-widget centered highlight m-b">
                        <div className="label">Supply</div>
                        <div className="value">{this.abbreviateNumber(t.totalSupply)}</div>
                      </div>
                    </div>
                    <div className="col-6 b-b">
                      <div className="block-widget centered highlight m-b">
                        <div className="label">Issued</div>
                        <div className="value">{this.abbreviateNumber(t.num)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="row block-kv">
                    <div className="col p-0">
                      <span>Owner</span>
                    </div>
                    <div className="col p-0 text-right">
                      <span className="hash">{t.ownerAddress}</span>
                    </div>
                  </div>

                  <div className="row block-kv">
                    <div className="col p-0">
                      <span>Start Date</span>
                    </div>
                    <div className="col p-0 text-right">
                      <span>{formatTime(t.startTime)}</span>
                    </div>
                  </div>

                  <div className="row block-kv">
                    <div className="col p-0">
                      <span>End Date</span>
                    </div>
                    <div className="col p-0 text-right">
                      <span>{formatTime(t.endTime)}</span>
                    </div>
                  </div>

                  <div className="row block-kv">
                    <div className="col p-0">
                      <span>Decay Ratio</span>
                    </div>
                    <div className="col p-0 text-right">
                      <span>{t.decayRatio}</span>
                    </div>
                  </div>

                  <div className="row block-kv">
                    <div className="col p-0">
                      <span>Vote Score</span>
                    </div>
                    <div className="col p-0 text-right">
                      <span>{t.voteScore}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default TokensListPage;
