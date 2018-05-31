import React from 'react';
import { TransactionList, Loading } from '../components';
import api from '../api';

class TransactionListPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      transactions: null,
      totalTransactions: 0,
      currentPage: 1,
      limit: 40,
    };

    this.fetchData = this.fetchData.bind(this);
    this.goToPage = this.goToPage.bind(this);
  }

  componentDidMount() {
    this.fetchData(0);
  }

  fetchData(skip) {
    const { limit } = this.state;
    this.setState({
      fetching: true,
    });

    return api.getTransactions(limit, skip).then((response) => {
      this.setState({
        transactions: response.data,
        totalTransactions: response.total,
        fetching: false,
      });
    });
  }

  goToPage(page) {
    const { limit, totalTransactions } = this.state;
    const skip = limit * (page - 1);

    const totalPages = Math.ceil(totalTransactions / limit);
    if (page < 1 || page > totalPages) {
      return;
    }

    this.fetchData(skip).then(() => {
      this.setState({
        currentPage: page,
      });
    });
  }

  render() {
    const {
      fetching, transactions, totalTransactions, currentPage, limit,
    } = this.state;

    let pagesToRender = [];
    const totalPages = Math.ceil(totalTransactions / limit);
    const maxPages = 10;

    for (let i = 0; i < maxPages; i += 1) {
      if (currentPage - (maxPages - i) >= Math.max(1, currentPage - maxPages / 2)) {
        pagesToRender.push(currentPage - (maxPages - i));
      } else if (currentPage + i <= totalPages) {
        pagesToRender.push(currentPage + i);
      }
    }

    pagesToRender = pagesToRender.sort((a, b) => a - b);

    let set1;
    let set2;
    if (transactions && transactions.length > 0) {
      set1 = transactions.slice(0, transactions.length / 2);
      set2 = transactions.slice(transactions.length / 2, transactions.length);
    }

    return (
      <div className="content-box">
        {pagesToRender.length > 0 && (
          <div className="row">
            <div className="col">
              <div className="block-box p-1">
                <div className="row">
                  <div className="col-sm-12 col-md-5">
                    <p className="pagination-info">
                      {`Showing ${(currentPage - 1) * limit + 1} to ${Math.min(
                        totalTransactions,
                        currentPage * limit,
                      )} of ${totalTransactions} transactions`}
                    </p>
                  </div>
                  <div className="col-sm-12 col-md-7">
                    <nav>
                      <ul className="pagination justify-content-center m-0">
                        <li className="page-item page-item-button">
                          <button
                            className="page-link"
                            onClick={() => this.goToPage(currentPage - 1)}
                          >
                            Previous
                          </button>
                        </li>
                        {pagesToRender.map(p => (
                          <li
                            className={p === currentPage ? 'page-item active' : 'page-item'}
                            key={p}
                          >
                            <button className="page-link" onClick={() => this.goToPage(p)}>
                              {p}
                            </button>
                          </li>
                        ))}
                        <li className="page-item page-item-button">
                          <button
                            className="page-link"
                            onClick={() => this.goToPage(currentPage + 1)}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          {!transactions || fetching ? (
            <Loading />
          ) : (
            <React.Fragment>
              <div className="col-12 col-lg-6">
                <TransactionList transactions={set1} />
              </div>
              <div className="col-12 col-lg-6">
                <TransactionList transactions={set2} />
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default TransactionListPage;
