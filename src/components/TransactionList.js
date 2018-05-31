import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { formatTime, formatCurrency } from '../utils';

const TransactionList = ({ transactions, title }) => {
  if (!transactions) {
    return <Loading />;
  }

  return (
    <div className="block-wrapper">
      {title && <h6 className="block-header">{title}</h6>}

      <div className="block-box-tp">
        {transactions.length ? (
          <div className="table-responsive">
            <table className="table table-padded">
              <tbody>
                {transactions.filter(Boolean).map(t => (
                  <tr key={t.hash} className="transaction-row">
                    <td style={{ width: '20%' }}>
                      <div className="smaller lighter">{formatTime(t.timestamp, 'MMM DD')}</div>
                      <div className="smaller lighter">{formatTime(t.timestamp, 'HH:mm')}</div>
                    </td>
                    <td className="nowrap" style={{ width: '60%' }}>
                      <Link to={`/transactions/${t.hash}`}>
                        <span className="icon-circle smaller red" />
                        <span className="text-xs">{t.from}</span>
                        <br />
                        <span className="icon-circle smaller green" />
                        <span className="text-xs">{t.to}</span>
                      </Link>
                    </td>
                    <td className="bolder nowrap" style={{ width: '20%' }}>
                      <Link to={`/transactions/${t.hash}`}>
                        <div className="text-success text-sm">{formatCurrency(t.amount, 2)}</div>
                        <div className="smaller lighter">{t.asset}</div>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No Transactions</div>
        )}
      </div>
    </div>
  );
};

TransactionList.propTypes = {
  transactions: PropTypes.array,
  title: PropTypes.string,
};

TransactionList.defaultProps = {
  transactions: null,
  title: null,
};

export default TransactionList;
