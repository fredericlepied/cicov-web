import axios from "axios";
import * as types from "./productsActionsTypes";

export function getProducts() {
  return (dispatch, getState) => {
    const { apiURL } = getState().config;
    return axios.get(`${apiURL}/products`).then(response => {
      dispatch({
        type: types.FETCH_PRODUCTS,
        products: response.data
      });
      return response;
    });
  };
}
