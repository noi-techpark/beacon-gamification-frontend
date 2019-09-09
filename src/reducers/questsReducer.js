export const questsReducerActionTypes = {
  CREATE_QUEST_SUCCESS: "CREATE_QUEST_SUCCESS",
  GET_QUEST_LIST_SUCCESS: "GET_QUEST_LIST_SUCCESS"
};

const INITIAL_STATE = {
  questList: {}
};

export const questReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case questsReducerActionTypes.CREATE_QUEST_SUCCESS:
      return {
        ...state,
        questList: action.payload
      };
    case questsReducerActionTypes.GET_QUEST_LIST_SUCCESS:
      console.log(action.payload);

      return {
        ...state,
        questList: action.payload
      };
    default:
      return state;
  }
};
