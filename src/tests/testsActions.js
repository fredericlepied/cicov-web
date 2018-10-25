import axios from "axios";
import * as types from "./testsActionsTypes";

export function getTests(ids) {
  return (dispatch, getState) => {
    const { apiURL } = getState().config;
    const list = ids.join(',');
    return axios.get(`${apiURL}/tests?id__in=${list}`).then(response => {
      dispatch({
        type: types.GET_TESTS,
        data: response.data
      });
      return response;
    });
  };
}
