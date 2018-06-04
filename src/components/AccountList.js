import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { formatCurrency } from '../utils';

const AccountList = ({ accounts, title }) => {
  if (!accounts) {
    return <Loading />;
  }

  if (!accounts.length) {
    return (
      <div className="block-box animation-fade-up">
        <div>No Accounts</div>
      </div>
    );
  }

  const list1 = accounts.filter((t, i) => i % 2 === 0);
  const list2 = accounts.filter((t, i) => i % 2 === 1);

  const renderTable = items => (
    <div
      className="table-responsive col-12 col-lg-6 pr-1 pl-1"
      style={{ marginTop: '-0.5rem' }}
    >
      <table className="table table-padded animation-fade-up mb-0 pb-0">
        <tbody>
          {items.filter(Boolean).map(t => (
            <tr key={t.address} className="account-row">
              <td style={{ width: '60%' }}>
                <Link to={`/accounts/${t.address}`}>
                  {/* <span className="icon-circle green" /> */}
                  <span className="text-xs">{t.address}</span>
                </Link>
              </td>
              <td className="bolder" style={{ width: '40%' }}>
                <Link to={`/accounts/${t.address}`}>
                  <div className="text-success text-sm">
                    {formatCurrency(t.trxBalance, 2)}
                  </div>
                  <div className="smaller lighter">TRX</div>
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

AccountList.propTypes = {
  accounts: PropTypes.array,
  title: PropTypes.string,
};

AccountList.defaultProps = {
  accounts: null,
  title: null,
};

export default AccountList;
