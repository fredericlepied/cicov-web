import reducer from "./productsReducer";
import * as types from "./productsActionsTypes";

it("FETCH_PRODUCTS", () => {
  const newState = reducer(undefined, {
    type: types.FETCH_PRODUCTS,
    products: [{ id: "1", name: "p1" }]
  });
  expect(newState).toEqual({products: {"1": { id: "1", name: "p1" }}});
});
