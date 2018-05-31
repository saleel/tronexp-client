import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Loading } from '../components';
import api from '../api';
import { formatTime } from '../utils';

class TransactionPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      transaction: {},
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    const { match: { params: { hash } = {} } = {} } = this.props;
    this.getData(hash);
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { hash } = {} } = {} } = nextProps;
    this.getData(hash);
  }

  getData(hash) {
    api.getTransaction(hash).then((transaction) => {
      this.setState({
        transaction,
      });
    });
  }

  render() {
    const { transaction } = this.state;

    if (!transaction || !transaction.hash) {
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
                    <h6>{formatTime(transaction.timestamp)}</h6>
                  </div>
                  <div className="row">
                    <div className="col-12 b-b">
                      <div className="block-widget centered padded-v-big highlight bigger">
                        <div className="label">Amount</div>
                        <div className="value">{transaction.amount}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="padded-sm m-b">
                  <div className="row block-kv">
                    <div className="col">
                      <span>Hash</span>
                    </div>
                    <div className="col text-right">
                      <span className="hash">{transaction.hash}</span>
                    </div>
                  </div>
                  <div className="row block-kv">
                    <div className="col">
                      <span>From</span>
                    </div>
                    <div className="col text-right">
                      <span className="hash">{transaction.from}</span>
                    </div>
                  </div>
                  <div className="row block-kv">
                    <div className="col">
                      <span>To</span>
                    </div>
                    <div className="col text-right">
                      <span className="hash">{transaction.to}</span>
                    </div>
                  </div>
                  <div className="row block-kv">
                    <div className="col">
                      <span>Amount</span>
                    </div>
                    <div className="col text-right">
                      <span>
                        {transaction.amount} {transaction.asset}
                      </span>
                    </div>
                  </div>
                  <div className="row block-kv">
                    <div className="col">
                      <span>Timestamp</span>
                    </div>
                    <div className="col text-right">
                      <span>{formatTime(transaction.timestamp)}</span>
                    </div>
                  </div>
                  <div className="row block-kv">
                    <div className="col">
                      <span>Block Number</span>
                    </div>
                    <div className="col text-right">
                      <Link to={`/blocks/${transaction.blockNumber}`}>
                        <span>{transaction.blockNumber}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TransactionPage.defaultProps = {
  match: { params: { hash: '' } },
};

TransactionPage.propTypes = {
  match: PropTypes.object,
};

export default TransactionPage;
