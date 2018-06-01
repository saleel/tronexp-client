import React from 'react';
import Datamap from 'datamaps';
import api from '../api';
import { Loading } from '../components';

class NodesListPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      countries: [],
      nodes: null,
    };
  }

  async componentDidMount() {
    const response = await api.getNodes(100);
    const nodes = response.data;

    let cities = [];
    let countries = [];

    nodes.forEach((n) => {
      const countryName = n.country || 'Unknown';
      let country = countries.find(a => a.country === countryName);
      if (!country) {
        countries.push({ country: countryName, count: 0 });
        country = countries.find(a => a.country === countryName);
      }
      country.count += 1;

      const cityName = n.city || 'Unknown';
      let city = cities.find(a => a.city === cityName);
      if (!city) {
        cities.push({
          city: cityName,
          latitude: n.latitude,
          longitude: n.longitude,
          count: 0,
        });
        city = cities.find(a => a.city === cityName);
      }
      city.count += 1;
    }, []);

    countries = countries.sort((a, b) => b.count - a.count);
    cities = cities.sort((a, b) => b.count - a.count);

    this.setState({ nodes, countries });

    const map = new Datamap({
      element: this.mapContainer,
      fills: {
        defaultFill: '#38415D',
        node: '#16203F',
      },
      geographyConfig: {
        // highlightOnHover: false,
        popupOnHover: false,
        borderColor: '#697387',
        borderWidth: 0.5,
      },
    });

    map.bubbles(cities.map(c => ({
      name: `${c.city} (${c.count})`,
      radius: 5,
      latitude: c.latitude,
      longitude: c.longitude,
      fillKey: 'node',
      popupTemplate: (geo, data) => `<div class="hoverinfo">${data}</div>`,
    })));
  }

  render() {
    const { countries, nodes } = this.state;

    return (
      <div className="content-box">
        <div className="row">
          <div className="col-12">
            <div className="block-wrapper">
              <div className="block-box p-3">
                <div
                  ref={(ref) => {
                    this.mapContainer = ref;
                  }}
                  style={{ height: '500px' }}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-12 mb-4">
            <div className="row">
              {countries.map(c => (
                <div key={c.country} className="col">
                  <div className="country-tile p-b-0">
                    <div className="country-tile-box mx-auto">
                      <div className="country-count">{c.count}</div>
                      <div className="country-text">{c.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12">
            {!nodes ? (
              <Loading />
            ) : (
              <div className="block-wrapper">
                <div className="block-box">
                  <div className="table-responsive">
                    <table className="table table-lightborder">
                      <thead>
                        <tr>
                          <th>Address</th>
                          <th className="text-center">City</th>
                          <th className="text-right">Country</th>
                        </tr>
                      </thead>
                      <tbody>
                        {nodes.map((m, i) => (
                          <tr key={(m.address + i)}>
                            <td>{m.address}</td>
                            <td className="text-center">{m.city}</td>
                            <td className="text-right">{m.country}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default NodesListPage;
