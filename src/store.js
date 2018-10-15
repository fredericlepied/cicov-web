import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from 'redux-logger';
import thunk from "redux-thunk";
import configReducer from "./config/configReducer";
import productsReducer from "./api/productsReducer";
import rfesReducer from "./api/rfesReducer";
import jobResultsReducer from "./api/jobResultsReducer";
import rfeResultsReducer from "./api/rfeResultsReducer";

const store = createStore(
  combineReducers({
    config: configReducer,
    products: productsReducer,
    rfes: rfesReducer,
    job_results: jobResultsReducer,
    rfe_results: rfeResultsReducer,
  }),
  applyMiddleware(createLogger(),
                  thunk)
);

export default store;
