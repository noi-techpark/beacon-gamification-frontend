import { questsReducerActionTypes } from "../reducers/questsReducer";
import { getBeaconListAction } from "../actions/beaconsActions";

export const questsMiddleware = store => next => action => {
  if (action.type === questsReducerActionTypes.SELECT_CURRENT_QUEST) {
    store.dispatch(getBeaconListAction());
  }
  let result = next(action);
  return result;
};
