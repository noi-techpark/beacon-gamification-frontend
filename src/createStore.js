import { lazyReducerEnhancer } from "pwa-helpers/lazy-reducer-enhancer.js";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { modalsReducer } from "./reducers/modalsReducer";
import { questReducer } from "./reducers/questsReducer";
import { beaconsReducer } from "./reducers/beaconsReducer";
import { questsMiddleware } from "./redux-middlewares/quests-middleware";

const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  state => state,
  devCompose(
    lazyReducerEnhancer(combineReducers),
    applyMiddleware(thunk, questsMiddleware)
  )
);

store.addReducers({
  modalsReducer,
  questReducer,
  beaconsReducer
});
