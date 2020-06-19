import { 
  SET_BASE_PATH,
  SET_CURRENT_PAGE, 
  SET_TOTAL_PAGES,
} from '../constants/actionTypes.js';

const initialState = {
  basePath: "/movies/",
  currentPage: 1,
  totalPages: 0
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BASE_PATH:
      return {
        ...state,
        basePath : action.payload.basePath
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

export default appReducer;
