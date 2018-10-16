import axios from "axios";
import * as types from "./productsActionsTypes";

export function getProducts() {
  return (dispatch, getState) => {
    const { apiURL } = getState().config;
    return axios.get(`${apiURL}/products`).then(response => {
      dispatch({
        type: types.GET_PRODUCTS,
        products: response.data
      });
      return response;
    });
  };
}

export function getProductDetails({ id }) {
  return (dispatch, getState) => {
    const { apiURL } = getState().config;
    return axios.get(`${apiURL}/products/${id}`).then(response => {
      dispatch({
        type: types.GET_PRODUCT_DETAILS,
        product: response.data
      });
      return response;
    });
  };
}
