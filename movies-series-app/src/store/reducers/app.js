import { SET_BASE_PATH } from '../constants/actionTypes.js';

const initialState = {
  basePath: ""
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BASE_PATH:
      return {
        ...state,
        basePath : action.payload.basePath
      };
    default:
      return state;
  }
};

export default appReducer;
