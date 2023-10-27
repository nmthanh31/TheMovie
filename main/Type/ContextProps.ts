import {typeSpace} from './Space';
import {Dispatch, SetStateAction} from 'react';
import {typeTag} from './Tag';

export interface typeMyContextProps {
  spaceItems: typeSpace[];
  setSpaceItems: Dispatch<SetStateAction<typeSpace[]>>;

  tagItems: typeTag[];
  setTagItems: Dispatch<SetStateAction<typeTag[]>>;
}
