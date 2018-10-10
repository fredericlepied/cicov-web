import * as actions from "./configActions";
import * as types from "./configActionsTypes";

it("setConfig", () => {
  const config = { apiURL: "http://example.org" };
  const expectedAction = {
    type: types.SET_CONFIG,
    config
  };
  expect(actions.setConfig(config)).toEqual(expectedAction);
});
