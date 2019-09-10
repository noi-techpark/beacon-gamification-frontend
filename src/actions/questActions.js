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

export const editQuestAction = (id, body) => async (dispatch, getState) => {
  try {
    await fetch(`${API_CONFIG.base_path}/quest/${id}`, {
      method: "PATCH",
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

export const deleteQuestAction = id => async (dispatch, getState) => {
  try {
    await fetch(`${API_CONFIG.base_path}/quest/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("auth-token")}`
      }
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

export const selectQuestAction = id => {
  return {
    type: questsReducerActionTypes.SELECT_CURRENT_QUEST,
    payload: id
  };
};

export const createQuestStepAction = body => async (dispatch, getState) => {
  try {
    await fetch(`${API_CONFIG.base_path}/quest-steps/`, {
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
      type: questsReducerActionTypes.CREATE_QUEST_STEPS_SUCCESS,
      payload: questList
    });
  } catch (e) {
    console.error(e);
  }
};
