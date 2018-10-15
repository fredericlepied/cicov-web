import reducer from "./rfesReducer";
import * as types from "./modelsActionsTypes";

it("FETCH_PRODUCTS", () => {
  const newState = reducer({}, {
    type: types.FETCH_MODELS,
    data: {rfes: {"1": {id: "1", name: "rfe1"}}}
  });
  expect(newState).toEqual({"1": { id: "1", name: "rfe1" }});
});
