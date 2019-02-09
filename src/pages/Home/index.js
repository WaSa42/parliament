import React from 'react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { translate } from 'react-i18next';

import { addHomePageFeedItems } from '../../actions/pages/home';
import { feedItemsSchema } from '../../schemas/feedItems';
import Senat from '../../fetch/senat.fr';

import Title from '../../components/MainHeader/Title';
import Loader from '../../components/Loader';
import FeedItem from '../../models/FeedItem';
import Feed from '../../components/Feed';
import WIP from '../../components/WIP';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFetching: false };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { dispatch, t } = this.props;
    const { isFetching } = this.state;

    if (!isFetching) {
      Senat.textes.get({
        onRequest: () => this.setState({ isFetching: true }),
        onSuccess: (response) => {
          dispatch(addHomePageFeedItems(response.items));
          this.setState({ isFetching: false });
        },
        onError: () => {
          this.setState({ isFetching: false });
          swal(t('request:error.title'), t('request:error.notPrecise'), 'error');
        },
      });
    }
  }

  render() {
    const { feedItems, t } = this.props;
    const { isFetching } = this.state;

    return (
      <div id="home">
        <Title>{t('route:home.description_short')}</Title>
        <div className="container">
          <WIP />
          {isFetching && <Loader />}
          {feedItems && <Feed items={Object.values(feedItems)} />}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  feedItems: PropTypes.objectOf(PropTypes.shape(FeedItem.getShape())),
  t: PropTypes.func.isRequired,
};

Home.defaultProps = {
  feedItems: {},
};

export default translate()(connect(
  state => ({ feedItems: denormalize(state.entities.feedItems, feedItemsSchema, state.pages.home.feedItems) }),
  dispatch => ({ dispatch }),
)(Home));
