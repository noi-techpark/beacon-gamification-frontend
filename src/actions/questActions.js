import { questsReducerActionTypes } from "../reducers/questsReducer";
import { API_CONFIG } from "../config";

const objectToFormData = obj =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    acc.append(key, value);
    return acc;
  }, new FormData());

export const createQuestAction = body => async (dispatch, getState) => {
  try {
    dispatch({
      type: questsReducerActionTypes.START_FETCHING
    });

    const formData = objectToFormData(body);

    await fetch(`${API_CONFIG.base_path}/quest/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth-token")}`
      },
      body: formData
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
    await fetch(`${API_CONFIG.base_path}/quest/${id}/`, {
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
      type: questsReducerActionTypes.EDIT_QUEST_SUCCESS,
      payload: questList
    });
  } catch (e) {
    console.error(e);
  }
};

export const deleteQuestAction = id => async (dispatch, getState) => {
  try {
    await fetch(`${API_CONFIG.base_path}/quest/${id}/`, {
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
      type: questsReducerActionTypes.DELETE_QUEST_SUCCESS,
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

export const selectQuestStepAction = id => {
  return {
    type: questsReducerActionTypes.SELECT_CURRENT_QUEST_STEP,
    payload: id
  };
};

export const createQuestStepAction = body => async (dispatch, getState) => {
  try {
    dispatch({
      type: questsReducerActionTypes.START_FETCHING
    });

    const formData = objectToFormData(body);

    await fetch(`${API_CONFIG.base_path}/quest-steps/`, {
      method: "POST",
      body: formData,
      headers: {
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
      type: questsReducerActionTypes.CREATE_QUEST_STEPS_SUCCESS,
      payload: questList
    });
  } catch (e) {
    console.error(e);
  }
};

export const editQuestStepAction = (id, body) => async (dispatch, getState) => {
  try {
    await fetch(`${API_CONFIG.base_path}/quest-steps/${id}/`, {
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
      type: questsReducerActionTypes.EDIT_QUEST_STEP_SUCCESS,
      payload: questList
    });
  } catch (e) {
    console.error(e);
  }
};

export const deleteQuestStepAction = id => async (dispatch, getState) => {
  try {
    await fetch(`${API_CONFIG.base_path}/quest-steps/${id}/`, {
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
      type: questsReducerActionTypes.DELETE_QUEST_STEP_SUCCESS,
      payload: questList
    });
  } catch (e) {
    console.error(e);
  }
};

export const openCreateQuestStep = () => {
  return {
    type: questsReducerActionTypes.OPEN_CREATE_QUEST_STEP
  };
};
