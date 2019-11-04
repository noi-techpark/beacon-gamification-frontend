import { modalsReducerActionTypes } from "../reducers/modalsReducer";

export const showModalAction = id => ({
  type: modalsReducerActionTypes.SHOW_MODAL,
  payload: id
});

export const hideModalAction = id => ({
  type: modalsReducerActionTypes.HIDE_MODAL,
  payload: id
});
