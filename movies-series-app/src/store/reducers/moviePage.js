import { 
  FILL_MOVIES, 
} from '../constants/actionTypes.js';

const initialState = {
  movies: [],
};

const moviePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILL_MOVIES:
      return {
        ...state,
        movies : action.payload.movies
      };
    default:
      return state;
  }
};

export default moviePageReducer;
