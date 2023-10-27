import Realm from 'realm';
import {BSON} from 'realm';
import LineItem from './LineItem';

export default class Tag extends Realm.Object<Tag> {
  _id!: string;
  name: string;
  color: string;
  line_items: Realm.List<LineItem>;


  static schema = {
    name: 'Tag',
    properties: {
      _id: {type: 'string', default: () => new BSON.ObjectID().toString()},
      name: {type: 'string'},
      color: {type: 'string'},
      line_items: {
        type: 'linkingObjects',
        objectType: 'LineItem',
        property: 'tags',
      },
    },
    primaryKey: '_id',
  };

  static generate(name: string, color: string) {
    return {
      _id: new BSON.ObjectID().toString(),
      name,
      color,
    };
  }

  constructor(realm: Realm, name: string, color: string) {
    super(realm, {
      _id: new BSON.ObjectID().toString(),
      name,
      color,
    });
  }
}
