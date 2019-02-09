import some from 'lodash/some';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import { faLandmark } from '@fortawesome/free-solid-svg-icons/faLandmark';
import { faPlaceOfWorship } from '@fortawesome/free-solid-svg-icons/faPlaceOfWorship';

class FeedItem {
  constructor(props) {
    const { author, categories, description, id, link, pubDate, title } = props;

    this.id = id;
    this.author = author;
    this.title = title;
    this.description = description;
    this.link = link;
    this.pubDate = moment(pubDate).format();
    this.categories = categories;
  }

  static getShape() {
    return {
      id: PropTypes.string.isRequired,
      author: PropTypes.oneOf(FeedItem.AUTHORS).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      link: PropTypes.string.isRequired,
      pubDate: PropTypes.string.isRequired,
      categories: PropTypes.arrayOf(PropTypes.oneOf(FeedItem.CATEGORIES)),
    };
  }

  static parseCategories(categories) {
    return categories.map((category) => {
      let matchedCategory = 'other';
      some(FeedItem.CATEGORIES_MATCHING, (matchings, key) => {
        const match = matchings.includes(category);
        if (match) matchedCategory = key;
        return match;
      });

      return matchedCategory;
    });
  }

  getPageLink() {
    return `/feed/item/${this.id}`;
  }
}

FeedItem.LAST_ID = -1;

FeedItem.AUTHORS = ['senate', 'assembly', 'constitutionalCouncil', 'other'];
FeedItem.AUTHORS_ICON = {
  senate: faPlaceOfWorship,
  assembly: faLandmark,
};

FeedItem.CATEGORIES = ['proposal', 'project', 'constitutional', 'organic', 'program', 'resolution', 'other'];
FeedItem.CATEGORIES_MATCHING = { // TODO: Maybe turning this into regex ?
  proposal: ['proposition de loi'],
  project: ['projet de loi'],
  constitutional: ['proposition de loi constitutionnelle'],
  organic: ['projet de loi organique'],
  program: ['projet de loi de programmation'],
  resolution: ['proposition de résolution'],
};

export default FeedItem;
