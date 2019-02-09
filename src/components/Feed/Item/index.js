import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';

import FeedItem from '../../../models/FeedItem';
import FeedItemBadges from './Badges';

const FeedItemComponent = ({ item, t }) => {
  const { title, pubDate, description } = item;

  return (
    <li>
      <div className="feed-badge">
        <FontAwesomeIcon icon={faPencilAlt} />
      </div>
      <div className="card">
        <div className="card-body">
          <FeedItemBadges {...item} />
          <h5 className="card-title">{title}</h5>
          <p className="card-subtitle mb-2 text-muted">
            <FontAwesomeIcon icon={faClock} />
            {' '}
            {moment(pubDate).format('LLLL')}
          </p>
          <p className="card-text">{description}</p>
          <div className="text-right d-none d-sm-block">
            <button type="button" className="btn btn-link card-link">
              {t('component:FeedItem.news')}
            </button>
            <Link
              to={new FeedItem(item).getPageLink()}
              className="card-link"
            >
              {t('component:FeedItem.link')}
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

FeedItemComponent.propTypes = {
  item: PropTypes.shape(FeedItem.getShape()).isRequired,
  t: PropTypes.func.isRequired,
};

export default translate()(FeedItemComponent);
