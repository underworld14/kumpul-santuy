import {applyMiddleware} from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';

export default middlewares = applyMiddleware(logger, promise);
