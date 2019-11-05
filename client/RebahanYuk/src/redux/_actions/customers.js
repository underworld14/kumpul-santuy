import * as types from '../types';
import {axios, api_url} from '../../api-url';

export const handleGetCustomers = token => ({
  type: types.GET_CUSTOMERS,
  payload: axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    url: `${api_url}/customers`,
  }),
});

export const handlePostCustomers = (token, name, idcard, phone) => ({
  type: types.POST_CUSTOMERS,
  payload: axios({
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    url: `${api_url}/customer`,
    data: {
      identity: idcard,
      name: name,
      phone: phone,
    },
  }),
});

export const handlePutCustomers = (token, name, idcard, phone, idcustomer) => ({
  type: types.PUT_CUSTOMERS,
  payload: axios({
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    url: `${api_url}/customer/${idcustomer}`,
    data: {
      identity: idcard,
      name: name,
      phone: phone,
    },
  }),
});
