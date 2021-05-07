import axios from 'axios';
import { ILocation } from '../types';

export const getLocationsByQuery = (query: string): Promise<ILocation[]> => {
  return axios.get(`/api/getLocations?query=${query}`).then(({ data }) => data);
};
