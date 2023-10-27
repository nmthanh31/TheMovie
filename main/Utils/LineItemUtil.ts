import LineItem from 'main/Model/Realm/LineItem';
import {typeLineItem} from 'main/Type/LineItem';
import {typeMovie} from 'main/Type/Movie';
import {typeTV} from 'main/Type/TV';
import {List} from 'realm';

const convertTypeMovieToTypeLineItem = (movie: typeMovie): typeLineItem => {
  const obj: typeLineItem = {
    id: movie.id,
    media_type: 'movie',
    name: movie.title,
    release_date: movie.release_date,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
  };
  return obj;
};

const convertTypeTVShowToTypeLineItem = (tv: typeTV): typeLineItem => {
  const obj: typeLineItem = {
    id: tv.id,
    media_type: 'tv',
    name: tv.name,
    release_date: tv.first_air_date,
    poster_path: tv.poster_path,
    backdrop_path: tv.backdrop_path,
  };
  return obj;
};

const isExistLineItemInSpace = (
  lineItem: Realm.List<LineItem> | undefined,
  id: string,
): boolean => {
  if (lineItem === undefined) {
    return false;
  }
  let ans = false;
  lineItem.forEach(item => {
    if (item.id === id) {
      ans = true;
    }
  });
  return ans;
};

export {convertTypeMovieToTypeLineItem, convertTypeTVShowToTypeLineItem};
export {isExistLineItemInSpace};
