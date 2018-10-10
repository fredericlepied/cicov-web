import axios from "axios";
import * as types from "./productsActionsTypes";

export function getProducts() {
  return (dispatch, getState) => {
    const { apiURL } = getState().config;
    return axios.get(`${apiURL}/api/v1/products`).then(response => {
      dispatch({
        type: types.FETCH_PRODUCTS,
        products: response.data.results
      });
      return response;
    });
  };
}
