import * as types from "./testsActionsTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_TESTS:
    const data = {};
    action.data.map(item => data[item.id] = item);
      return {
        ...state,
        ...data
      };
    default:
      return state;
  }
}
