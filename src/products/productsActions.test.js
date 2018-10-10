import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axiosMockAdapter from "axios-mock-adapter";

import { getProducts } from "./productsActions";
import * as types from "./productsActionsTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const axiosMock = new axiosMockAdapter(axios);

it("getProducts", () => {
  axiosMock.onGet("https://api.example.org/products").reply(200, [{ id: "p1" }]);
  const expectedActions = [
    {
      type: types.FETCH_PRODUCTS,
      products: [{ id: "p1" }]
    }
  ];
  const store = mockStore({ config: { apiURL: "https://api.example.org" } });
  return store.dispatch(getProducts()).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});
