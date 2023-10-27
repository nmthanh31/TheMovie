import {BSON} from 'realm';
import CreditModel from './CreditModel';
import Genres from './Genres';
import Space from './Space';
import Tag from './Tag';

export default class LineItem extends Realm.Object<LineItem> {
  private _id(_id: any, id: string) {
    throw new Error('Method not implemented.');
  }
  id!: string;
  media_type!: string;
  name!: string;
  imdb_id?: string;
  tags: Realm.List<Tag>;
  genres: Realm.List<Genres>;
  credits: Realm.List<CreditModel>;
  release_date?: string;
  poster_path?: string;
  backdrop_path?: string;
  watchedAt?: Date | null;
  createdAt?: Date = new Date();
  space?: Realm.Results<Space>;

  static schema = {
    name: 'LineItem',
    properties: {
      id: {type: 'string', default: () => new BSON.ObjectID().toString()},
      media_type: {type: 'string'},
      name: {type: 'string'},
      imdb_id: {type: 'string?'},
      release_date: {type: 'string?'},
      poster_path: {type: 'string?'},
      backdrop_path: {type: 'string?'},
      tags: {
        type: 'list',
        objectType: 'Tag',
      },
      genres: {
        type: 'list',
        objectType: 'Genres',
      },
      space: {
        type: 'linkingObjects',
        objectType: 'Space',
        property: 'lineItems',
      },
      watchedAt: {type: 'date?'},
    },
    primaryKey: 'id',
  };

  static make(
    realm: Realm,
    id: string,
    media_type: string,
    name: string,
    poster_path?: string,
    backdrop_path?: string,
    release_date?: string,
    watchedAt?: Date | null,
  ) {
    let results = realm.objectForPrimaryKey('LineItem', id);
    if (!results) {
      const data = {
        id,
        media_type,
        name,
        poster_path,
        backdrop_path,
        release_date,
      };
      results = realm.create<LineItem>('LineItem', data);
      console.log('Create New LineItem');
    }
    return results;
  }
}
