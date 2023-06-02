import { combineReducers } from 'redux';
import entities from './entities';

export const rootReducer = (routerReducer: any) =>
  combineReducers({
    router: routerReducer,
    entities,
  });
