import React from 'react';
import { Box, Loading } from '../components';
import api from '../api';

class WitnessesListPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      witnesses: null,
      mostProductive: null,
      leastProductive: null,
    };
  }

  async componentDidMount() {
    const response = await api.getWitnesses(100);
    const witnesses = response.data || [];

    const prodSorted = witnesses.sort((a, b) => b.productivity - a.productivity);
    const mostProductive = prodSorted[0];
    const leastProductive = prodSorted[prodSorted.length - 1];

    this.setState({
      witnesses: witnesses.sort((a, b) => b.voteCount - a.voteCount),
      mostProductive,
      leastProductive,
    });
  }

  render() {
    const { witnesses, mostProductive, leastProductive } = this.state;

    return (
      <div className="content-box">
        <div className="row justify-content-center m-b-3">
          <div className="col-12 col-sm-3">
            <Box
              styles={{ height: '120px' }}
              value={witnesses && witnesses.length}
              label="Representatives"
            />
          </div>
          <div className="col-12 col-sm-3">
            <Box
              styles={{ height: '120px' }}
              value={mostProductive && mostProductive.url}
              valueFontSize="16"
              label="Most Productive"
            />
          </div>
          <div className="col-12 col-sm-3">
            <Box
              styles={{ height: '120px' }}
              value={leastProductive && leastProductive.url}
              valueFontSize="16"
              label="Least Productive"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="block-wrapper p-2 mt-3">
              {/* <h6 className="block-header">Super Representatives</h6> */}
              {witnesses && witnesses.length ? (
                <div className="table-responsive">
                  <table className="table table-padded">
                    <thead>
                      <tr>
                        <th style={{ width: '5%' }}>#</th>
                        <th style={{ width: '40%' }}>Name</th>
                        <th style={{ width: '10%' }}>Last</th>
                        <th style={{ width: '10%' }}>Produced/Missed</th>
                        <th style={{ width: '10%' }}>Productivity</th>
                        <th className="text-center" style={{ width: '20%' }}>
                          Votes
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {witnesses.map((w, i) => (
                        <tr key={w.address}>
                          <td>{i + 1}</td>
                          <td>
                            <a href={w.url} target="_blank" style={{ color: 'inherit' }}>
                              {w.url.slice(0, 30)}
                            </a>
                            {/* <div className="smaller lighter m-t-1">{w.address}</div> */}
                          </td>
                          <td>{w.latestBlockNumber}</td>
                          <td>
                            {w.producedTotal}/{w.missedTotal}
                          </td>
                          <td>
                            <span className={w.productivity > 80 ? 'text-success' : ''}>
                              {w.productivity ? `${w.productivity}%` : ''}
                            </span>
                          </td>
                          <td className="text-right bolder nowrap">
                            <span>{w.voteCount} TRX</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WitnessesListPage;
