import { combineReducers } from 'redux';
import moviePageReducer from './moviePage';
import appReducer from './app';
import seriesPageReducer from './seriesPage';

const reducers = combineReducers({
  app: appReducer,
  moviePage : moviePageReducer,
  seriesPage: seriesPageReducer,
});

export default reducers;
