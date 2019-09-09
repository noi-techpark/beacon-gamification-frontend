import { questsReducerActionTypes } from "./questsReducer";

export const modalsReducerActionTypes = {
  SHOW_MODAL: "SHOW_MODAL",
  HIDE_MODAL: "HIDE_MODAL"
};

const INITIAL_STATE = {
  showModal: false,
  currentModal: ""
};

export const modalsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case modalsReducerActionTypes.SHOW_MODAL:
      return { ...state, showModal: true, currentModal: action.payload };
    case modalsReducerActionTypes.HIDE_MODAL:
    case questsReducerActionTypes.CREATE_QUEST_SUCCESS:
      return { ...state, showModal: false, currentModal: "" };
    default:
      return state;
  }
};
