import React from 'react';
import PropTypes from 'prop-types';
import { TransactionList, Loading } from '../components';
import api from '../api';
import { formatTime } from '../utils';

class BlockPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      block: {},
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

  getData(blockNumber) {
    api.getBlock(blockNumber).then((block) => {
      this.setState({
        block,
      });
    });
  }

  render() {
    const { block } = this.state;

    if (!block || !block.hash) {
      return (
        <div className="content-box">
          <Loading />
        </div>
      );
    }

    return (
      <div className="content-box">
        <div className="row">
          <div className="col-lg-6">
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
                      <span className="hash">{block.witnessAddress}</span>
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

          <div className="col-lg-6">
            <TransactionList transactions={block.transactions} title="Transactions" />
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
