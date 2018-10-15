import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axiosMockAdapter from "axios-mock-adapter";

import { getProductDetails } from "./productActions";
import * as types from "./modelsActionsTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const axiosMock = new axiosMockAdapter(axios);

it("getProductDetails", () => {
  const response = { id: "1", name: "p1", job_results: ["1", "2"] };
  axiosMock.onGet("https://api.example.org/product/1/").reply(200, response);
  const expectedActions = [
    {
      type: types.FETCH_MODELS,
      data: {"products": {"1": {"id": "1", "name": "p1", "job_results": ["1", "2"]}}}
    }
  ];
  const store = mockStore({ config: { apiURL: "https://api.example.org" } });
  return store.dispatch(getProductDetails(1)).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});
