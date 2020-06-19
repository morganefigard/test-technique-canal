import moviePageReducer from './moviePage';
import appReducer from './app';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  app: appReducer,
  moviePage : moviePageReducer,
});

export default reducers;
