import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axiosMockAdapter from "axios-mock-adapter";

import { getTests } from "./testsActions";
import * as types from "./testsActionsTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const axiosMock = new axiosMockAdapter(axios);

it("getTest", () => {
  axiosMock
    .onGet("https://api.example.org/api/tests?id__in=1")
    .reply(200, [{ id: 1, name: "test1"}]);
  const expectedActions = [
    {
      type: types.GET_TESTS,
      data: [{ id: 1, name: "test1" }]
    }
  ];
  const store = mockStore({
    config: { apiURL: "https://api.example.org/api" }
  });
  return store.dispatch(getTests([1])).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});
