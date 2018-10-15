import reducer from "./rfeResultsReducer";
import * as types from "./modelsActionsTypes";

it("FETCH_PRODUCTS", () => {
  const newState = reducer({"2": { id: "2", name: "rr2" }}, {
    type: types.FETCH_MODELS,
    data: {rfe_results: {"1": {id: "1", name: "rr1"}}}
  });
  expect(newState).toEqual({"1": { id: "1", name: "rr1" },
                            "2": { id: "2", name: "rr2" }});
});
