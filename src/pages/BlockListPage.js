import React from 'react';
import { BlockList, Loading } from '../components';
import api from '../api';

class BlockListPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      blocks: null,
      totalBlocks: 0,
      currentPage: 1,
      limit: 20,
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

    return api.getBlocks({ limit, skip }).then((response) => {
      this.setState({
        blocks: response.data,
        totalBlocks: response.total,
        fetching: false,
      });
    });
  }

  goToPage(page) {
    const { limit, totalBlocks } = this.state;
    const skip = limit * (page - 1);

    const totalPages = Math.ceil(totalBlocks / limit);
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
      fetching, blocks, totalBlocks, currentPage, limit,
    } = this.state;

    let pagesToRender = [];
    const totalPages = Math.ceil(totalBlocks / limit);
    const maxPages = 10;

    for (let i = 0; i < maxPages; i += 1) {
      if (currentPage - (maxPages - i) >= Math.max(1, currentPage - maxPages / 2)) {
        pagesToRender.push(currentPage - (maxPages - i));
      } else if (currentPage + i <= totalPages) {
        pagesToRender.push(currentPage + i);
      }
    }

    pagesToRender = pagesToRender.sort((a, b) => a - b);

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
                        totalBlocks,
                        currentPage * limit,
                      )} of ${totalBlocks} blocks`}
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
          <div className="col-12">
            {!blocks || fetching ? <Loading /> : <BlockList blocks={blocks} />}
          </div>
        </div>
      </div>
    );
  }
}

export default BlockListPage;
