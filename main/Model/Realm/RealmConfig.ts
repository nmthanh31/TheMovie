import Space from './Space';
import { createRealmContext } from '@realm/react';
import Tag from './Tag';
import LineItem from './LineItem';

import Note from './Note';
import Genres from './Genres';


export const SyncedRealmContext = createRealmContext({
  // Pass all of your models into the schema value.
  schema: [Space, Tag, LineItem, Genres, Note],

});
