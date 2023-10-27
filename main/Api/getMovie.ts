import {Base_URL, mvdbkey} from 'main/Config/env';
import {axiosInstance} from './axiosInstance';

const getMovie = () => {
  return axiosInstance.get(`${Base_URL}/discover/movie`, {
    params: {
      api_key: mvdbkey,
    },
  });
};
export {getMovie};
