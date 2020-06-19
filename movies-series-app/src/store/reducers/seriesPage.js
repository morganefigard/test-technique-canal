import { 
  FILL_SERIES, 
} from '../constants/actionTypes.js';

const initialState = {
  series: [],
};

const seriesPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILL_SERIES:
      return {
        ...state,
        series : action.payload.series
      };
    default:
      return state;
  }
};

export default seriesPageReducer;
