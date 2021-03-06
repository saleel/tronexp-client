import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { formatTime, formatCurrency } from '../utils';

const TransactionList = ({ transactions, title }) => {
  if (!transactions) {
    return <Loading />;
  }

  if (!transactions.length) {
    return (
      <div className="block-box animation-fade-up">
        <div>No Transactions</div>
      </div>
    );
  }

  const list1 = transactions.filter((t, i) => i % 2 === 0);
  const list2 = transactions.filter((t, i) => i % 2 === 1);

  const renderTable = items => (
    <div className="table-responsive col-12 col-lg-6 pr-1 pl-1" style={{ marginTop: '-0.5rem' }}>
      <table className="table table-padded animation-fade-up mb-0 pb-0">
        <tbody>
          {items.filter(Boolean).map(t => (
            <tr key={t.hash} className="transfer-row">
              <td style={{ width: '20%' }}>
                <div className="smaller lighter">
                  {formatTime(t.timestamp, 'MMM DD')}
                </div>
                <div className="smaller lighter">
                  {formatTime(t.timestamp, 'HH:mm')}
                </div>
              </td>
              <td className="bolder" style={{ width: '80%' }}>
                <Link to={`/transactions/${t.hash}`}>
                  <div className="smaller text-primary">{t.contractType}</div>
                  <span className="text-xs text-success">{t.owner}</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="block-wrapper">
      {title && <h6 className="block-header">{title}</h6>}

      <div className="block-box-tp row">
        {renderTable(list1)}
        {renderTable(list2)}
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
