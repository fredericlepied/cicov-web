import * as types from "./testsActionsTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_TEST:
    const data = {};
    data[action.data.id] = action.data;
      return {
        ...state,
        ...data
      };
    default:
      return state;
  }
}
