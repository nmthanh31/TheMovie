import Realm from 'realm';

class Cast extends Realm.Object<Cast> {
  id: string;

  static schema = {
    name: 'Cast',
    primaryKey: 'id',
    properties: {
      id: 'string',
    },
  };
}

export default Cast;
