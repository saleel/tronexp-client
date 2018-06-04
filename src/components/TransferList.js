import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { formatTime, formatCurrency } from '../utils';

const TransferList = ({ transfers, title }) => {
  if (!transfers) {
    return <Loading />;
  }

  if (!transfers.length) {
    return (
      <div className="block-box animation-fade-up">
        <div>No Transfers</div>
      </div>
    );
  }

  const list1 = transfers.filter((t, i) => i % 2 === 0);
  const list2 = transfers.filter((t, i) => i % 2 === 1);

  const renderTable = items => (
    <div
      className="table-responsive col px-1"
      style={{ marginTop: '-0.5rem' }}
    >
      <table className="table table-padded animation-fade-up mb-0 pb-0">
        <tbody>
          {items.filter(Boolean).map(t => (
            <tr key={t.hash} className="transfer-row">
              <td style={{ width: '15%' }}>
                <div className="smaller lighter">
                  {formatTime(t.timestamp, 'MMM DD')}
                </div>
                <div className="smaller lighter">
                  {formatTime(t.timestamp, 'HH:mm')}
                </div>
              </td>
              <td style={{ width: '65%' }}>
                <Link to={`/transactions/${t.hash}`}>
                  <span className="icon-circle smaller red" />
                  <span className="text-xs">{t.data.from}</span>
                  <br />
                  <span className="icon-circle smaller green" />
                  <span className="text-xs">{t.data.to}</span>
                </Link>
              </td>
              <td className="bolder" style={{ width: '20%' }}>
                <Link to={`/transactions/${t.hash}`}>
                  <div className="text-success text-sm">
                    {formatCurrency(t.data.amount, 2)}
                  </div>
                  <div className="smaller lighter">{t.data.asset}</div>
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

TransferList.propTypes = {
  transfers: PropTypes.array,
  title: PropTypes.string,
};

TransferList.defaultProps = {
  transfers: null,
  title: null,
};

export default TransferList;
