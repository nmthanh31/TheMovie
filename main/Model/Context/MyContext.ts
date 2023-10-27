import {typeMyContextProps} from 'main/Type/ContextProps';
import {createContext} from 'react';

const MyContext = createContext<typeMyContextProps>({
  spaceItems: [],
  setSpaceItems: () => {},

  tagItems: [],
  setTagItems: () => {},
});

export {MyContext};
