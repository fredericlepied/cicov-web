import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axiosMockAdapter from "axios-mock-adapter";

import { getJobResult } from "./jobResultActions";
import * as types from "./modelsActionsTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const axiosMock = new axiosMockAdapter(axios);

it("getJobResult", () => {
  const response = { id: "1", url: "url1" };
  axiosMock.onGet("https://api.example.org/job_result/1/").reply(200, response);
  const expectedActions = [
    {
      type: types.FETCH_MODELS,
      data: {"job_results": {"1": {"id": "1", "url": "url1"}}}
    }
  ];
  const store = mockStore({ config: { apiURL: "https://api.example.org" } });
  return store.dispatch(getJobResult(1)).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});
