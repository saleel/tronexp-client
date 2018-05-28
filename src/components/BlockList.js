import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { formatTime } from '../utils';

const BlockList = ({ blocks, title }) => {
  if (!blocks) {
    return (
      <div className="block-list">
        <div className="block-wrapper">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="block-list">
      <div className="block-wrapper">
        {title && <h6 className="block-header">{title}</h6>}
        <div className="row pt-1">
          {blocks.filter(Boolean).map(b => (
            <div className="col m-0 pb-3 pl-2 pr-2" key={b.number}>
              <Link
                to={`/blocks/${b.number}`}
                className="block-container"
                style={{ minWidth: '400px' }}
              >
                <div className="recent-block-head">
                  <div className="badge badge-primary-inverted">{formatTime(b.timestamp)}</div>
                </div>
                <div className="recent-block-body">
                  <div className="recent-block-content">
                    <h6 className="recent-block-height">#{b.number}</h6>
                    <div className="recent-block-desc">
                      <span>WITNESS: </span>
                      <span>{b.witnessAddress && b.witnessAddress.toString()}</span>
                    </div>
                  </div>
                </div>
                <div className="recent-block-footer">
                  <span className="value">TRANSACTIONS</span>
                  <span className="label">{b.transactionsCount}</span>
                  <span className="value">SIZE</span>
                  <span className="label">{b.size}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

BlockList.propTypes = {
  blocks: PropTypes.array,
  title: PropTypes.string,
};

BlockList.defaultProps = {
  blocks: null,
  title: null,
};

export default BlockList;
