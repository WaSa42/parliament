import React from 'react';
import PropTypes from 'prop-types';

import FeedItem from '../../models/FeedItem';

import './Feed.css';
import FeedItemComponent from './Item';

const Feed = ({ items }) => (
  <ul className="feed">
    {items.map(item => <FeedItemComponent item={item} key={`feedItem-${item.id}`} />)}
  </ul>
);

Feed.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(FeedItem.getShape())),
};

Feed.defaultProps = {
  items: [],
};

export default Feed;
