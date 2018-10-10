import reducer from "./productsReducer";
import * as types from "./productsActionsTypes";

it("FETCH_PRODUCTS", () => {
  const newState = reducer(undefined, {
    type: types.FETCH_PRODUCTS,
    products: [{ id: "p1" }]
  });
  expect(newState).toEqual({
    p1: { id: "p1" }
  });
});
