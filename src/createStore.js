import { createStore } from "redux";
import { modalsReducer } from "./reducers/modals.js";

export const store = createStore(
  modalsReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
