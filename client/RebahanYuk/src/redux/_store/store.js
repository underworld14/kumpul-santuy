import {createStore, applyMiddleware} from 'redux';
import middlewares from './middlewares';

import {AppReducers} from '../_reducers/index';

const store = createStore(AppReducers, middlewares);

export default store;
