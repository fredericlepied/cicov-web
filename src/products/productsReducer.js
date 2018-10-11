import * as types from "./productsActionsTypes";
import * as ptypes from "../product/productActionsTypes";
import { normalize } from "normalizr";
import * as schema from "../api/schema";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
  case types.FETCH_PRODUCTS:
    const normalized = normalize(action.products, schema.products);
    return {...state, ...normalized.entities};
  case ptypes.FETCH_PRODUCT_DETAILS:
    const normalized2 = normalize(action.details, schema.product);
    return {...state, ...normalized2.entities};
  default:
    return state;
  }
}
