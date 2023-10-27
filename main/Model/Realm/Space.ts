import Realm, {BSON} from 'realm';
import LineItem from './LineItem';
import Note from './Note';

export default class Space extends Realm.Object<Space> {
  _id!: string;
  name: string;
  isSecret: boolean;
  color: string;
  icon?: number;
  lineItems: Realm.List<LineItem>;
  notes: Realm.List<Note>;

  static schema = {
    name: 'Space',
    properties: {
      _id: {type: 'string', default: () => new BSON.ObjectID().toString()},
      name: {type: 'string', indexed: true},
      isSecret: {type: 'bool'},
      color: {type: 'string'},
      icon: {type: 'int?'},
      lineItems: {type: 'list', objectType: 'LineItem'},
      notes: {type: 'list', objectType: 'Note'},
    },
    primaryKey: '_id',
  };

  static generate(
    name: string,
    isSecret: boolean,
    color: string,
    icon?: number,
  ) {
    return {
      _id: new BSON.ObjectID().toString(),
      isSecret,
      name,
      color,
      icon,
    };
  }

  constructor(
    realm: Realm,
    name: string,
    isSecret: boolean,
    color: string,
    icon?: number,
  ) {
    super(realm, {
      _id: new BSON.ObjectID().toString(),
      name,
      isSecret,
      color,
      icon,
    });
  }
}
