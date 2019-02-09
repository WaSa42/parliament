import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons/faCalendarAlt';

import FeedItem from '../../models/FeedItem';

import './Feed.css';
import FeedItemComponent from './Item';

class Feed extends React.Component {
  renderItems() {
    const rendering = [];
    const { items } = this.props;

    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      rendering.push(<FeedItemComponent item={item} key={`feedItem-${item.id}`} />);

      const nextItem = items[i + 1];
      if (nextItem && !moment(nextItem.pubDate).isSame(item.pubDate, 'day')) {
        const dateString = moment(nextItem.pubDate).format('LL');
        rendering.push(
          <li className="date-separator" key={`date-separator-${dateString}`}>
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
            {dateString}
          </li>,
        );
      }
    }

    return rendering;
  }

  render() {
    return (
      <ul className="feed">{this.renderItems()}</ul>
    );
  }
}

Feed.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(FeedItem.getShape())),
};

Feed.defaultProps = {
  items: [],
};

export default Feed;
