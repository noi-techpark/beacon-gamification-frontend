import { questsReducerActionTypes } from "../reducers/questsReducer";
import { API_CONFIG } from "../config";

export const createQuestAction = body => async (dispatch, getState) => {
  try {
    await fetch(`${API_CONFIG.base_path}/quest/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("auth-token")}`
      },
      body: JSON.stringify(body)
    });
    const requestQuestList = await fetch(`${API_CONFIG.base_path}/quest/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth-token")}`
      }
    });
    const questList = await requestQuestList.json();

    dispatch({
      type: questsReducerActionTypes.CREATE_QUEST_SUCCESS,
      payload: questList
    });
  } catch (e) {
    console.error(e);
  }
};

export const getQuestListAction = () => async (dispatch, getState) => {
  try {
    const requestQuestList = await fetch(`${API_CONFIG.base_path}/quest/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth-token")}`
      }
    });
    const questList = await requestQuestList.json();

    dispatch({
      type: questsReducerActionTypes.GET_QUEST_LIST_SUCCESS,
      payload: questList
    });
  } catch (e) {
    console.error(e);
  }
};
