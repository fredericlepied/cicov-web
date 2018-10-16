import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axiosMockAdapter from "axios-mock-adapter";

import { getProducts, getProductDetails } from "./productsActions";
import * as types from "./productsActionsTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const axiosMock = new axiosMockAdapter(axios);

it("getProducts", () => {
  axiosMock
    .onGet("https://api.example.org/api/products")
    .reply(200, [{ id: "p1" }]);
  const expectedActions = [
    {
      type: types.GET_PRODUCTS,
      products: [{ id: "p1" }]
    }
  ];
  const store = mockStore({
    config: { apiURL: "https://api.example.org/api" }
  });
  return store.dispatch(getProducts()).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});

it("getProductDetails", () => {
  const product = { id: "1", name: "p1", job_results: ["1", "2"] };
  axiosMock
    .onGet("https://api.example.org/api/products/1")
    .reply(200, product);
  const expectedActions = [
    {
      type: types.GET_PRODUCT_DETAILS,
      product
    }
  ];
  const store = mockStore({
    config: { apiURL: "https://api.example.org/api" }
  });
  return store.dispatch(getProductDetails({ id: "1" })).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});
