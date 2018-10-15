import reducer from "./productsReducer";
import * as types from "./modelsActionsTypes";

it("FETCH_PRODUCTS", () => {
  const newState = reducer({}, {
    type: types.FETCH_MODELS,
    data: {products: {"1": {id: "1", name: "p1"}}}
  });
  expect(newState).toEqual({"1": { id: "1", name: "p1" }});
});
