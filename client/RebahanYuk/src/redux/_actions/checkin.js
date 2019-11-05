import * as types from '../types';
import {axios, api_url} from '../../api-url';

export const handleGetCheckIn = token => ({
  type: types.GET_CHECKIN,
  payload: axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    url: `${api_url}/checkin`,
  }),
});

export const handlePostCheckIn = (token, idRoom, idCustomer, duration) => ({
  type: types.POST_CHECKIN,
  payload: axios({
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    url: `${api_url}/checkin`,
    data: {
      id_room: idRoom,
      id_customer: idCustomer,
      duration: duration,
    },
  }),
});

export const handlePutCheckOut = (token, idOrder) => ({
  type: types.PUT_CHECKOUT,
  payload: axios({
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    url: `${api_url}/order/${idOrder}`,
  }),
});
