export const questsReducerActionTypes = {
  CREATE_QUEST_SUCCESS: "CREATE_QUEST_SUCCESS",
  GET_QUEST_LIST_SUCCESS: "GET_QUEST_LIST_SUCCESS",
  SELECT_CURRENT_QUEST: "SELECT_CURRENT_QUEST",
  SELECT_CURRENT_QUEST_STEP: "SELECT_CURRENT_QUEST_STEP",
  CREATE_QUEST_STEPS_SUCCESS: "CREATE_QUEST_STEPS_SUCCESS"
};

const INITIAL_STATE = {
  // currentQuestId?: number;
  // currentQuest: {};
  // currentQuestStep: {};
  questList: {}
};

export const questReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case questsReducerActionTypes.CREATE_QUEST_SUCCESS:
    case questsReducerActionTypes.CREATE_QUEST_STEPS_SUCCESS:
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

    case questsReducerActionTypes.SELECT_CURRENT_QUEST_STEP:
      const currentQuestStep = state.currentQuest.steps.find(
        o => o.id === action.payload
      );

      return {
        ...state,
        currentQuestStepId: action.payload,
        currentQuestStep
      };

    default:
      return state;
  }
};
