import Realm from 'realm';
import Cast from './Cast';
import LineItem from './LineItem';

class CreditModel extends Realm.Object<CreditModel> {
  id!: string;
  name!: string;
  original_name!: string;
  adult: boolean;
  gender: number;
  known_for_department: string;
  popularity: number;
  profile_path?: string;
  cast_id?: number;
  character: string;
  credit_id: string;
  line_items: Realm.Results<LineItem>;

  static schema = {
    name: 'CreditModel',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      original_name: 'string',
      adult: 'bool',
      gender: 'int',
      known_for_department: 'string',
      popularity: 'double',
      profile_path: 'string?',
      cast_id: 'double?',
      character: 'string',
      credit_id: 'string',
      line_items: {
        type: 'linkingObjects',
        objectType: 'LineItem',
        property: 'credits',
      },
    },
  };

  static make(realm: Realm, credit: Cast) {
    // if (!credit) {
    //   return undefined;
    // }
    // let results = realm.objectForPrimaryKey(
    //   'CreditModel',
    //   credit.id.toString(),
    // );
    // if (!results) {
    //   const data = {
    //     id: credit.id.toString(),
    //     name: credit.name,
    //     original_name: credit.name,
    //     adult: credit.adult,
    //     gender: credit.gender,
    //     known_for_department: credit.known_for_department,
    //     popularity: credit.popularity,
    //     profile_path: credit.profile_path,
    //     cast_id: credit.cast_id,
    //     character: credit.character,
    //     credit_id: credit.credit_id,
    //   };
    //   results = realm.create('CreditModel', data);
    // }
    // return results;
  }
}

export default CreditModel;
