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
      return { ...state, showModal: true };
    case modalsReducerActionTypes.HIDE_MODAL:
      return { ...state, showModal: false };
    default:
      return state;
  }
};
