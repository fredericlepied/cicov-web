import axios from "axios";
import * as types from "./productActionsTypes";

export function getProductDetails(id) {
  return (dispatch, getState) => {
    const { apiURL } = getState().config;
    return axios.get(`${apiURL}/product/${id}/`).then(response => {
      dispatch({
        type: types.FETCH_PRODUCT_DETAILS,
        details: response.data
      });
      return response;
    });
  };
}
