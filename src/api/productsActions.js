import axios from "axios";
import { normalize } from "normalizr";
import * as schema from "../api/schema";
import * as types from "./modelsActionsTypes";

export function getProducts() {
  return (dispatch, getState) => {
    const { apiURL } = getState().config;
    return axios.get(`${apiURL}/products`).then(response => {
    const normalized = normalize(response.data, schema.products);
      dispatch({
        type: types.FETCH_MODELS,
        data: normalized.entities
      });
      return response;
    });
  };
}
