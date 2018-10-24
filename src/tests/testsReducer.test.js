import reducer from "./testsReducer";
import * as types from "./testsActionsTypes";

it("GET_TEST", () => {
  const newState = reducer(
    {},
    {
      type: types.GET_TEST,
      data: { id: "1", name: "p1" }
    }
  );
  expect(newState).toEqual({ "1": { id: "1", name: "p1" } });
});
