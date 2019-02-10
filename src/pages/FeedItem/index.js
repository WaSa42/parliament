import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { denormalize } from 'normalizr';
import { translate } from 'react-i18next';
import { Document, Page, pdfjs } from 'react-pdf';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';

import FeedItem from '../../models/FeedItem';
import { feedItemSchema } from '../../schemas/feedItems';

import Title from '../../components/MainHeader/Title';
import SideAction from '../../components/MainHeader/SideAction';
import NoMatch from '../NoMatch';
import Loader from '../../components/Loader';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class FeedItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
    };
  }

  render() {
    const { history, item, t } = this.props;
    const { pageNumber } = this.state;

    if (!item) return <NoMatch />;

    const instanceOfFeedItem = new FeedItem(item);
    const { description, title } = instanceOfFeedItem;

    return (
      <div id="feedItem">
        <Helmet>
          <title>{`${title} | ${t('project.title')}`}</title>
          <meta name="description" content={description} />
        </Helmet>
        <Title>{title}</Title>
        <SideAction>
          <div className="btn-side-action mx-2 mx-sm-3">
            <button type="button" className="btn" onClick={() => history.goBack()}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </div>
        </SideAction>
        <div className="container">
          <Document file={instanceOfFeedItem.getPDFDocument()} loading={<Loader />}>
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      </div>
    );
  }
}

FeedItemPage.propTypes = {
  history: PropTypes.shape({ goBack: PropTypes.func.isRequired }),
  item: PropTypes.shape(FeedItem.getShape()),
  t: PropTypes.func.isRequired,
};

FeedItemPage.defaultProps = {
  history: null,
  item: null,
};

export default translate()(connect(
  (state, ownProps) => ({ item: denormalize(ownProps.match.params.itemId, feedItemSchema, state.entities) }),
  dispatch => ({ dispatch }),
)(FeedItemPage));
