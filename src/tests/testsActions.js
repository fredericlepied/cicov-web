import axios from "axios";
import * as types from "./testsActionsTypes";

export function getTest(id) {
  return (dispatch, getState) => {
    const { apiURL } = getState().config;
    return axios.get(`${apiURL}/tests/${id}`).then(response => {
      dispatch({
        type: types.GET_TEST,
        data: response.data
      });
      return response;
    });
  };
}
