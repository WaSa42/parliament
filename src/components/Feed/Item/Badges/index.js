import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FeedItem from '../../../../models/FeedItem';

const FeedItemBadges = ({ author, categories, t }) => {
  const authorIcon = FeedItem.AUTHORS_ICON[author];
  return (
    <ul className="feed-badges">
      <li className="badge badge-secondary p-md-2 mr-2 mb-2">
        {authorIcon && <FontAwesomeIcon icon={authorIcon} className="mr-2" />}
        {t(`component:FeedItem.author.${author}`)}
      </li>
      {categories.map(category => (
        <li className="badge badge-light p-1 mr-2 mb-2">
          {t(`component:FeedItem.categories.${category}`)}
        </li>
      ))}
    </ul>
  );
};

const shape = FeedItem.getShape();
FeedItemBadges.propTypes = {
  author: shape.author,
  categories: shape.categories,
  t: PropTypes.func.isRequired,
};

FeedItemBadges.defaultProps = {
  author: '',
  categories: [],
};

export default translate()(FeedItemBadges);
