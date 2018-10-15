import * as types from "./modelsActionsTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
  case types.FETCH_MODELS:
    if (action.data.products) {
      return {...state, ...action.data.products};
    } else {
      return state;
    }
  default:
    return state;
  }
}
