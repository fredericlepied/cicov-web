import axios from "axios";
import { normalize } from "normalizr";
import * as schema from "./schema";
import * as types from "./modelsActionsTypes";
import { getJobResult } from './jobResultActions';

export function getProductDetails(id) {
  return (dispatch, getState) => {
    const { apiURL } = getState().config;
    return axios.get(`${apiURL}/product/${id}/`).then(response => {
    const normalized = normalize(response.data, schema.product);
      dispatch({
        type: types.FETCH_MODELS,
        data: normalized.entities
      });
      if (response.data.job_results) {
        response.data.job_results.forEach(id => getJobResult(id)(dispatch, getState));
      }
      return response;
    });
  };
}
