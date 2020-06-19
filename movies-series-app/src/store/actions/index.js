import { 
  FILL_MOVIES,
  SET_CURRENT_PAGE,
  SET_BASE_PATH,
  SET_TOTAL_PAGES,
  FILL_SERIES,
} from '../constants/actionTypes.js';

// App actions
export const setBasePath = (path) => {
  return {
    type: SET_BASE_PATH,
    payload: path
  };
};

export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page
  };
};

export const setTotalPages = (page) => {
  return {
    type: SET_TOTAL_PAGES,
    payload: page
  };
};


// Movie page actions
export const fillMovies = (movies) => {
  return {
    type: FILL_MOVIES,
    payload: movies
  };
};


// Series page actions
export const fillSeries = (series) => {
  return {
    type: FILL_SERIES,
    payload: series
  };
};
