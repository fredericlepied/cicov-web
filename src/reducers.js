// -*- rjsx -*-

// reducers.js | store management
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { fetchProducts, fetchProductDetail } from './api';

const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
const FETCH_PRODUCT_DETAILS = 'FETCH_PRODUCT_DETAILS';

// Reducers process action and update state accordingly.
const statusReducer = (state = {}, action) => {
    // state = null is the default state
    switch (action.type) {
    case FETCH_PRODUCTS:
        return {...state, products: action.products};
    case FETCH_PRODUCT_DETAILS:
        let data = (state.details) ? state.details : {};
        data[action.details.id] = action.details;
        return {...state, details: data};
    default:
        return state;
    }
}

function createMyStore() {
  // We can have multiple reducers for each context variable.
  return createStore(combineReducers({
      info: statusReducer,
  }), applyMiddleware(thunk));
}

// Actions to be dispatched.
function fetchProductsAction() {
  return (dispatch) => {
    return fetchProducts()
      .then(response => {
          dispatch({type: FETCH_PRODUCTS, products: response.data});
      })
      .catch(error => {
          throw (error);
      });
  };
}

function fetchProductDetailsAction(id) {
  return (dispatch) => {
    return fetchProductDetail(id)
      .then(response => {
          dispatch({type: FETCH_PRODUCT_DETAILS, details: response.data});
      })
      .catch(error => {
          throw (error);
      });
  };
}

export {
  createMyStore,
  fetchProductsAction,
  fetchProductDetailsAction,
}
