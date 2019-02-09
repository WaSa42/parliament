import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';

import FeedItem from '../../../models/FeedItem';
import FeedItemBadges from './Badges';

const FeedItemComponent = ({ item }) => {
  const { title, pubDate, description } = item;

  return (
    <li>
      <div className="feed-badge">
        <FontAwesomeIcon icon={faPencilAlt} />
      </div>
      <Link to={new FeedItem(item).getPageLink()} className="card">
        <div className="card-body">
          <FeedItemBadges {...item} />
          <h5 className="card-title">{title}</h5>
          <p className="card-subtitle text-muted mb-2">
            <FontAwesomeIcon icon={faClock} />
            {' '}
            {moment(pubDate).format('LLLL')}
          </p>
          <p className="card-text">{description}</p>
        </div>
      </Link>
    </li>
  );
};

FeedItemComponent.propTypes = {
  item: PropTypes.shape(FeedItem.getShape()).isRequired,
};

export default FeedItemComponent;
