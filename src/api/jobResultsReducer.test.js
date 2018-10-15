import reducer from "./jobResultsReducer";
import * as types from "./modelsActionsTypes";

it("FETCH_PRODUCTS", () => {
  const newState = reducer({"2": { id: "2", name: "jr2" }}, {
    type: types.FETCH_MODELS,
    data: {job_results: {"1": {id: "1", name: "jr1"}}}
  });
  expect(newState).toEqual({"1": { id: "1", name: "jr1" },
                            "2": { id: "2", name: "jr2" }});
});
