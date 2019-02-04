import pullAll from 'lodash/pullAll';
import { createReducer } from '../_utilities';

import {
  HOME_RESET,
  // feedItems
  HOME_FEEDITEMS_ADD,
  HOME_FEEDITEMS_REMOVE,
  HOME_FEEDITEMS_OVERRIDE,
  HOME_FEEDITEMS_RESET,
} from '../../actions/pages/home';

const initialState = { feedItems: [] };

function addFeedItems(state, { ids }) {
  return { ...state, feedItems: [...state.feedItems, ids] };
}

function removeFeedItems(state, { ids }) {
  return { ...state, feedItems: pullAll([...state.feedItems], ids) };
}

function overrideFeedItems(state, { ids }) {
  return { ...state, feedItems: ids };
}

function resetFeedItems(state) {
  return { ...state, feedItems: initialState.feedItems };
}

function reset() {
  return initialState;
}

export default createReducer(initialState, {
  [HOME_RESET]: reset,
  // feedItems
  [HOME_FEEDITEMS_ADD]: addFeedItems,
  [HOME_FEEDITEMS_REMOVE]: removeFeedItems,
  [HOME_FEEDITEMS_OVERRIDE]: overrideFeedItems,
  [HOME_FEEDITEMS_RESET]: resetFeedItems,
});
