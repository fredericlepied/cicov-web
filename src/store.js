import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from 'redux-logger';
import thunk from "redux-thunk";
import configReducer from "./config/configReducer";
import productsReducer from "./products/productsReducer";

const store = createStore(
  combineReducers({
    config: configReducer,
    models: productsReducer
  }),
  applyMiddleware(createLogger(),
                  thunk)
);

export default store;
