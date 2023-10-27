import {Base_URL, mvdbkey} from 'main/Config/env';
import {axiosInstance} from './axiosInstance';

const getTV = () => {
  return axiosInstance.get(`${Base_URL}/discover/tv`, {
    params: {
      api_key: mvdbkey,
    },
  });
};
export {getTV};
