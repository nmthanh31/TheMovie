import {Base_URL, mvdbkey} from 'main/Config/env';
import {axiosInstance} from './axiosInstance';

const findMovieAndTvShow = (name: string) => {
  return axiosInstance.get(`${Base_URL}/search/multi?query=${name}`, {
    params: {
      api_key: mvdbkey,
    },
  });
};
export {findMovieAndTvShow};
