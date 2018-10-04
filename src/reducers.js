// -*- rjsx -*-

// reducers.js | store management
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { fetchProducts } from './api';

const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

// Reducers process action and update state accordingly.
const statusReducer = (state = {}, action) => {
    // state = null is the default state
    switch (action.type) {
    case FETCH_PRODUCTS:
        // when success action is dispatched, state becomes status
        return {...state, products: action.products};
    default:
        return state;
    }
}

function createMyStore () {
  // We can have multiple reducers for each context variable.
  return createStore(combineReducers({
      info: statusReducer,
  }), applyMiddleware(thunk));
}

// Actions to be dispatched.
function fetchProductsAction () {
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

export {
  createMyStore,
  fetchProductsAction,
}
