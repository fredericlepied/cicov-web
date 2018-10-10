import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import configReducer from "./config/configReducer";
import productsReducer from "./products/productsReducer";

const store = createStore(
  combineReducers({
    config: configReducer,
    products: productsReducer
  }),
  applyMiddleware(thunk)
);

export default store;
