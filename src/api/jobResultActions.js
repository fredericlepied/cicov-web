import axios from "axios";
import { normalize } from "normalizr";
import * as schema from "./schema";
import * as types from "./modelsActionsTypes";

export function getJobResult(id) {
  return (dispatch, getState) => {
    const { apiURL } = getState().config;
    return axios.get(`${apiURL}/job_result/${id}/`).then(response => {
      const norm = normalize(response.data, schema.job_result);
      dispatch({
        type: types.FETCH_MODELS,
        data: norm.entities
      });
      return response;
    });
  };
}
