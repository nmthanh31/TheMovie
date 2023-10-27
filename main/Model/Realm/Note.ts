import Realm, { BSON } from "realm";

export default class Note extends Realm.Object<Note>{
  _id!: string;
  title: string;
  describe: string;

  static schema = {
    name: 'Note',
    properties: {
      _id: { type: 'string', default: () => new BSON.ObjectID().toString() },
      title: { type: 'string' },
      describe: { type: 'string' },
    },
    primaryKey: '_id',
  }

  static generate(
    title: string,
    describe: string,
  ){
    return {
      _id: new BSON.ObjectID().toString(),
      title,
      describe
    };
  }

  constructor(
    realm: Realm,
    title: string,
    describe: string,
  ){
    super(realm, {
      _id: new BSON.ObjectID().toString(),
      title,
      describe,
    });
  }
}