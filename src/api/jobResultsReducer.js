import * as types from "./modelsActionsTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
  case types.FETCH_MODELS:
    if (action.data.job_results) {
      return {...state, ...action.data.job_results};
    } else {
      return state;
    }
  default:
    return state;
  }
}
