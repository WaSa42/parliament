import { schema } from 'normalizr';

export const feedItemSchema = new schema.Entity('feedItems', {});
export const feedItemsSchema = [feedItemSchema];
