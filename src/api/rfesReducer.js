import * as types from "./modelsActionsTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
  case types.FETCH_MODELS:
    if (action.data.rfes) {
      return {...state, ...action.data.rfes};
    } else {
      return state;
    }
  default:
    return state;
  }
}
