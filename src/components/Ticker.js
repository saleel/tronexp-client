import React from 'react';
import moment from 'moment';
import { Line as LineChart } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { formatTime } from '../utils';

const Ticker = ({ ticker, priceHistory }) => {
  if (!ticker || !priceHistory) {
    return (
      <div className="block-box">
        <div className="block-widget bigger highlight bold-label  trend-in-corner">
          <Loading />
        </div>
      </div>
    );
  }

  const labels = priceHistory.map(h => formatTime(moment(h.time, 'X'), 'MMM DD'));
  const prices = priceHistory.map(h => h.close);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'TRX/USD',
        fillColor: '#2A354F',
        strokeColor: '#2D66F1',
        pointColor: '#2A3244',

        fill: false,
        lineTension: 0.1,
        backgroundColor: '#2A354F',
        borderColor: '#2D66F1',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',

        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointBackgroundColor: '#151F40',
        pointRadius: 4,
        pointHitRadius: 7,

        pointHoverBackgroundColor: '#151F40',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        pointHoverRadius: 6,

        scaleShowLabels: false,

        data: prices,
      },
    ],
  };

  const chartOptions = {
    scaleShowGridLines: false,
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: '#737D92',
            display: true,
          },
        },
      ],
    },
  };

  return (
    <div className="block-box" style={{ minHeight: '276px' }}>
      <div className="block-widget highlight bold-label  trend-in-corner">
        <div className={ticker.percent24 < 0 ? 'value text-danger' : 'value text-success'}>
          ${ticker.price}
        </div>
        <div className="label">TRX/USD</div>
        <div className="trending trending-down-basic">
          <span>{ticker.percent24}%</span>
          <i
            className={
              ticker.percent24 < 0 ? 'os-icon os-icon-arrow-down' : 'os-icon os-icon-arrow-up'
            }
          />
        </div>
      </div>
      <div className="block-chart">
        {chartData && (
          <LineChart
            data={chartData}
            legend={{
              display: false,
            }}
            options={chartOptions}
            width={400}
            height={115}
          />
        )}
      </div>
    </div>
  );
};

Ticker.propTypes = {
  ticker: PropTypes.object,
  priceHistory: PropTypes.array,
};

Ticker.defaultProps = {
  ticker: null,
  priceHistory: null,
};

export default Ticker;
