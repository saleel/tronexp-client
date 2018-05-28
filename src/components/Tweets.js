import React from 'react';
import PropTypes from 'prop-types';
import { Timeline } from 'react-twitter-widgets';

const Tweets = ({ username, title }) => (
  <div className="block-wrapper compact">
    {title && <h6 className="block-header">{title}</h6>}
    <div className="block-box-tp tweets">
      <Timeline
        dataSource={{
          sourceType: 'profile',
          screenName: username,
        }}
        options={{
          username,
          height: '400',
        }}
      />
    </div>
  </div>
);

Tweets.propTypes = {
  username: PropTypes.string,
  title: PropTypes.string,
};

Tweets.defaultProps = {
  username: 'tronfoundation',
  title: 'Tron Tweets',
};

export default Tweets;
