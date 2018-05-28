import React from 'react';
import { AccountList, Loading } from '../components';
import api from '../api';

class AccountListPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      accounts: null,
      totalAccounts: 0,
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

    return api.getAccounts(limit, skip).then((response) => {
      this.setState({
        accounts: response.data,
        totalAccounts: response.total,
        fetching: false,
      });
    });
  }

  goToPage(page) {
    const { limit, totalAccounts } = this.state;
    const skip = limit * (page - 1);

    const totalPages = Math.ceil(totalAccounts / limit);
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
      fetching, accounts, totalAccounts, currentPage, limit,
    } = this.state;

    let pagesToRender = [];
    const totalPages = Math.ceil(totalAccounts / limit);
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
    if (accounts && accounts.length > 0) {
      set1 = accounts.slice(0, accounts.length / 2);
      set2 = accounts.slice(accounts.length / 2, accounts.length);
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
                        totalAccounts,
                        currentPage * limit,
                      )} of ${totalAccounts} accounts`}
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
          {!accounts || fetching ? (
            <Loading />
          ) : (
            <React.Fragment>
              <div className="col-12 col-lg-6">
                <AccountList accounts={set1} />
              </div>
              <div className="col-12 col-lg-6">
                <AccountList accounts={set2} />
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default AccountListPage;
