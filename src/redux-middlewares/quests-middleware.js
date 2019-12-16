import { questsReducerActionTypes } from "../reducers/questsReducer";
import { getBeaconListAction } from "../actions/beaconsActions";
import { selectQuestAction } from "../actions/questActions";

export const questsMiddleware = store => next => action => {
  if (action.type === questsReducerActionTypes.SELECT_CURRENT_QUEST) {
    store.dispatch(getBeaconListAction("limit=99999"));
  }
  // if (action.type === questsReducerActionTypes.EDIT_QUEST_STEP_SUCCESS) {
  //   const state = store.getState();
  //   store.dispatch(selectQuestAction(state.questReducer.currentQuestId));
  // }
  let result = next(action);
  return result;
};
