import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import configReducer from "./config/configReducer";
import productsReducer from "./products/productsReducer";

let middleware = [thunk];
const env = process.env.NODE_ENV;
if (env !== "production" && env !== "test") {
  const createLogger = require("redux-logger").createLogger;
  middleware = [...middleware, createLogger()];
}

const store = createStore(
  combineReducers({
    config: configReducer,
    products: productsReducer
  }),
  applyMiddleware(...middleware)
);

export default store;
