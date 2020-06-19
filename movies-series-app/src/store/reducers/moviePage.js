import { 
  FILL_MOVIES, 
  SET_CURRENT_PAGE, 
  SET_TOTAL_PAGES,
} from '../constants/actionTypes.js';

const initialState = {
  movies: [],
  currentPage: 1,
  totalPages: 0
};

const moviePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILL_MOVIES:
      return {
        ...state,
        movies : action.payload.movies
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage : action.payload.currentPage
      };
    case SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages : action.payload.totalPages
      };
    default:
      return state;
  }
};

export default moviePageReducer;
