import React from 'react';
import { PropTypes } from 'prop-types';

class Search extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
    };

    this.onSearch = this.onSearch.bind(this);
  }

  onSearch() {
    const { keyword } = this.state;
    const { routeTo } = this.props;

    // test for block
    if (!isNaN(keyword) && keyword.length < 10) {
      routeTo('block', { blockNumber: keyword });
    }

    // transaction
    if (keyword.length === 64) {
      routeTo('transaction', { hash: keyword });
    }

    // account
    if (keyword.length === 34) {
      routeTo('account', { address: keyword });
    }

    return false;
  }

  render() {
    return (
      <form className="m-0 p-0" onSubmit={this.onSearch}>
        <div className="block-search autosuggest-search-activator">
          <input
            placeholder="Search for Blocks, Transactions, Accounts...etc"
            type="text"
            onChange={e => this.setState({ keyword: e.target.value })}
          />
          {/* <button type="submit">Go</button> */}
        </div>
      </form>
    );
  }
}

Search.propTypes = {
  routeTo: PropTypes.func.isRequired,
};

export default Search;
