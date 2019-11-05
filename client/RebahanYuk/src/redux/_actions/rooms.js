import * as types from '../types';
import {axios, api_url} from '../../api-url';

export const handleGetRooms = token => ({
  type: types.GET_ROOMS,
  payload: axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    url: `${api_url}/rooms`,
  }),
});

export const handlePostRooms = (token, input) => ({
  type: types.POST_ROOMS,
  payload: axios({
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    url: `${api_url}/room`,
    data: {
      room: input,
    },
  }),
});

export const handlePutRooms = (token, idRoom, room) => ({
  type: types.PUT_ROOMS,
  payload: axios({
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    url: `${api_url}/room/${idRoom}`,
    data: {
      room: room,
    },
  }),
});
