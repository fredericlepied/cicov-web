import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axiosMockAdapter from "axios-mock-adapter";

import { getTest } from "./testsActions";
import * as types from "./testsActionsTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const axiosMock = new axiosMockAdapter(axios);

it("getTest", () => {
  axiosMock
    .onGet("https://api.example.org/api/tests/1")
    .reply(200, { id: 1, name: "test1"});
  const expectedActions = [
    {
      type: types.GET_TEST,
      data: { id: 1, name: "test1" }
    }
  ];
  const store = mockStore({
    config: { apiURL: "https://api.example.org/api" }
  });
  return store.dispatch(getTest(1)).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});
