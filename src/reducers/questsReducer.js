export const questsReducerActionTypes = {
  CREATE_QUEST_SUCCESS: "CREATE_QUEST_SUCCESS",
  EDIT_QUEST_SUCCESS: "EDIT_QUEST_SUCCESS",
  DELETE_QUEST_SUCCESS: "DELETE_QUEST_SUCCESS",
  GET_QUEST_LIST_SUCCESS: "GET_QUEST_LIST_SUCCESS",
  SELECT_CURRENT_QUEST: "SELECT_CURRENT_QUEST",
  SELECT_CURRENT_QUEST_STEP: "SELECT_CURRENT_QUEST_STEP",
  CREATE_QUEST_STEPS_SUCCESS: "CREATE_QUEST_STEPS_SUCCESS",
  EDIT_QUEST_STEP_SUCCESS: "EDIT_QUEST_STEP_SUCCESS",
  DELETE_QUEST_STEP_SUCCESS: "DELETE_QUEST_STEP_SUCCESS",
  OPEN_CREATE_QUEST_STEP: "OPEN_CREATE_QUEST_STEP"
};

const INITIAL_STATE = {
  // currentQuestId?: number;
  // currentQuest: {};
  // currentQuestStep: {};
  isCreatingQuestStep: false,
  questList: {}
};

export const questReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case questsReducerActionTypes.CREATE_QUEST_SUCCESS:
    case questsReducerActionTypes.EDIT_QUEST_SUCCESS:
    case questsReducerActionTypes.DELETE_QUEST_SUCCESS:
    case questsReducerActionTypes.GET_QUEST_LIST_SUCCESS:
      return {
        ...state,
        questList: action.payload
      };

    case questsReducerActionTypes.CREATE_QUEST_STEPS_SUCCESS:
    case questsReducerActionTypes.EDIT_QUEST_STEP_SUCCESS: {
      const currentQuest = action.payload.results.find(
        o => o.id === state.currentQuestId
      );

      return {
        ...state,
        currentQuest,
        questList: action.payload,
        currentQuestStep: {},
        currentQuestStepId: undefined,
        isCreatingQuestStep: false
      };
    }

    case questsReducerActionTypes.DELETE_QUEST_STEP_SUCCESS: {
      const currentQuest = action.payload.results.find(
        o => o.id === state.currentQuestId
      );
      return {
        ...state,
        currentQuest,
        questList: action.payload,
        currentQuestStepId: undefined,
        currentQuestStep: {}
      };
    }

    case questsReducerActionTypes.SELECT_CURRENT_QUEST:
      const currentQuest = state.questList.results.find(
        o => o.id === action.payload
      );

      return {
        ...state,
        currentQuest,
        currentQuestId: action.payload,
        currentQuestStepId: undefined,
        currentQuestStep: {}
      };

    case questsReducerActionTypes.SELECT_CURRENT_QUEST_STEP:
      const currentQuestStep = state.currentQuest.steps.find(
        o => o.id === action.payload
      );

      return {
        ...state,
        currentQuestStep,
        currentQuestStepId: action.payload
      };

    case questsReducerActionTypes.OPEN_CREATE_QUEST_STEP:
      return {
        ...state,
        currentQuestStep: {},
        currentQuestStepId: null,
        isCreatingQuestStep: true
      };

    default:
      return state;
  }
};
