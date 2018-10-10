import * as types from "./productsActionsTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PRODUCTS:
      return action.products.reduce((accumulator, product) => {
        accumulator[product.id] = product;
        return accumulator;
      }, {});
    default:
      return state;
  }
}
