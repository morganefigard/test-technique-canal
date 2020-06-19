import { 
  FILL_MOVIES,
  SET_CURRENT_PAGE,
  SET_BASE_PATH,
  SET_TOTAL_PAGES,
} from '../constants/actionTypes.js';

// App actions
export const setBasePath = (path) => {
  return {
    type: SET_BASE_PATH,
    payload: path
  };
};

// Movie page actions
export const fillMovies = (movies) => {
  return {
    type: FILL_MOVIES,
    payload: movies
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

