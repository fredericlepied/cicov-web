import * as types from "./productsActionsTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce((acc, product) => {
          acc[product.id] = product;
          return acc;
        }, {})
      };
    case types.GET_PRODUCT_DETAILS:
      return {
        ...state,
        [action.product.id]: {
          ...state[action.product.id],
          ...action.product
        }
      };
    default:
      return state;
  }
}
