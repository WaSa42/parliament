import FeedItem from '../../../models/FeedItem';

// eslint-disable-next-line import/prefer-default-export
export const get = (callbacks, payload) => {
  const endpoint = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.senat.fr%2Frss%2Ftextes.rss';
  const { onError, onRequest, onSuccess } = callbacks;
  if (onRequest) onRequest(payload);

  const prettifyData = json => ({
    ...json,
    items: json.items.map((item) => {
      const newData = {
        ...item,
        id: item.guid.replace('http://www.senat.fr/', '').replace('.html', '').replace('/', '_'),
        author: 'senate',
        categories: FeedItem.parseCategories(item.categories),
      };

      const prettifiedData = {};
      Object.keys(FeedItem.getShape()).forEach((property) => {
        prettifiedData[property] = newData[property];
      });

      return prettifiedData;
    }),
  });

  return fetch(endpoint)
    .then(response => response.json())
    .then((json) => { if (onSuccess) onSuccess(prettifyData(json), payload); })
    .catch(e => onError && onError(e));
};
