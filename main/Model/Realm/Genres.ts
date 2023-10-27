import Realm from 'realm';
import LineItem from './LineItem';

class Genres extends Realm.Object<Genres> {
  id: string;
  name: string;
  line_items: Realm.Results<LineItem>;

  static schema = {
    name: 'Genres',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      line_items: {
        type: 'linkingObjects',
        objectType: 'LineItem',
        property: 'genres',
      },
    },
  };

  static generate(id: string, name: string) {
    return {
      id,
      name,
    };
  }

  static make(realm: Realm, id: string, name: string) {
    let result = realm.objectForPrimaryKey<Genres>('Genres', id.toString());
    if (!result) {
      result = realm.create<Genres>('Genres', {id: id.toString(), name});
    }
    return result;
  }
}

export default Genres;
