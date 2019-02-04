import { normalize } from 'normalizr';
import { feedItemsSchema } from '../../schemas/feedItems';
import { receiveEntities } from '../entities';

export const HOME_RESET = 'HOME_RESET';
export function resetHomePage() {
  return { types: HOME_RESET };
}

export const HOME_FEEDITEMS_ADD = 'HOME_FEEDITEMS_ADD';
export const HOME_FEEDITEMS_REMOVE = 'HOME_FEEDITEMS_REMOVE';
export const HOME_FEEDITEMS_OVERRIDE = 'HOME_FEEDITEMS_OVERRIDE';
export const HOME_FEEDITEMS_RESET = 'HOME_FEEDITEMS_RESET';

export function addHomePageFeedItems(feedItems) {
  return (dispatch) => {
    const normalized = normalize(feedItems, feedItemsSchema);
    const { result, entities } = normalized;

    dispatch(receiveEntities(entities));
    dispatch({ type: HOME_FEEDITEMS_ADD, ids: result });
  };
}
