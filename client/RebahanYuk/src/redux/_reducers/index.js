import {combineReducers} from 'redux';
import reducersRooms from './rooms';
import reducersCustomers from './customers';
import reducersCheckIn from './checkin';

export const AppReducers = combineReducers({
  rooms: reducersRooms,
  customers: reducersCustomers,
  checkin: reducersCheckIn,
});
