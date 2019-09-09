export const questsReducerActionTypes = {
  CREATE_QUEST_SUCCESS: "CREATE_QUEST_SUCCESS",
  GET_QUEST_LIST_SUCCESS: "GET_QUEST_LIST_SUCCESS",
  SELECT_CURRENT_QUEST: "SELECT_CURRENT_QUEST"
};

const INITIAL_STATE = {
  // currentQuestId?: number;
  // currentQuest: {};
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
      return {
        ...state,
        questList: action.payload
      };
    case questsReducerActionTypes.SELECT_CURRENT_QUEST:
      const currentQuest = state.questList.results.find(
        o => o.id === action.payload
      );

      return {
        ...state,
        currentQuestId: action.payload,
        currentQuest
      };
    default:
      return state;
  }
};
