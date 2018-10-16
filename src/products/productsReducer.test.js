import reducer from "./productsReducer";
import * as types from "./productsActionsTypes";

it("GET_PRODUCTS", () => {
  const newState = reducer(
    {},
    {
      type: types.GET_PRODUCTS,
      products: [{ id: "1", name: "p1" }]
    }
  );
  expect(newState).toEqual({ "1": { id: "1", name: "p1" } });
});

it("GET_PRODUCT_DETAILS", () => {
  const newState = reducer(
    {},
    {
      type: types.GET_PRODUCT_DETAILS,
      product: { id: "1", name: "p1" }
    }
  );
  expect(newState).toEqual({ "1": { id: "1", name: "p1" } });
});

it("GET_PRODUCT_DETAILS merge info", () => {
  const newState = reducer(
    { "1": { id: "1", name: "", job_results: [] } },
    {
      type: types.GET_PRODUCT_DETAILS,
      product: { id: "1", name: "p1" }
    }
  );
  expect(newState).toEqual({ "1": { id: "1", name: "p1", job_results: [] } });
});
