import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { formatCurrency } from '../utils';

const AccountList = ({ accounts, title }) => {
  if (!accounts) {
    return <Loading />;
  }

  return (
    <div className="block-wrapper">
      {title && <h6 className="block-header">{title}</h6>}

      <div className="block-box-tp">
        {accounts.length ? (
          <div className="table-responsive">
            <table className="table table-padded">
              <tbody>
                {accounts.filter(Boolean).map(t => (
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
        ) : (
          <div>No Transactions</div>
        )}
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
