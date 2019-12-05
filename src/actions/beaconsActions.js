import { API_CONFIG } from "../config";
import { beaconsReducerActionTypes } from "../reducers/beaconsReducer";

export const getBeaconListAction = pagination => async (dispatch, getState) => {
  try {
    const requestBeaconList = await fetch(
      `${API_CONFIG.base_path}/beacons/${pagination ? `?${pagination}/` : ""}`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("auth-token")}`
        }
      }
    );
    const beaconList = await requestBeaconList.json();

    dispatch({
      type: beaconsReducerActionTypes.GET_BEACON_LIST_SUCCESS,
      payload: beaconList
    });
  } catch (e) {
    console.error(e);
  }
};

export const createBeaconAction = body => async (dispatch, getState) => {
  try {
    await fetch(`${API_CONFIG.base_path}/beacons/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("auth-token")}`
      },
      body: JSON.stringify(body)
    });

    const requestBeaconList = await fetch(`${API_CONFIG.base_path}/beacons/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth-token")}`
      }
    });
    const beaconList = await requestBeaconList.json();

    dispatch({
      type: beaconsReducerActionTypes.CREATE_BEACON_SUCCESS,
      payload: beaconList
    });
  } catch (e) {
    console.error(e);
  }
};

export const deleteBeaconAction = id => async (dispatch, getState) => {
  try {
    await fetch(`${API_CONFIG.base_path}/beacons/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("auth-token")}`
      }
    });

    const requestBeaconList = await fetch(`${API_CONFIG.base_path}/beacons/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth-token")}`
      }
    });
    const beaconList = await requestBeaconList.json();

    dispatch({
      type: beaconsReducerActionTypes.DELETE_BEACON_SUCCESS,
      payload: beaconList
    });
  } catch (e) {
    console.error(e);
  }
};

export const selectBeaconAction = id => {
  return {
    type: beaconsReducerActionTypes.SELECT_CURRENT_BEACON,
    payload: id
  };
};

export const editBeaconAction = (id, body) => async dispatch => {
  try {
    await fetch(`${API_CONFIG.base_path}/beacons/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("auth-token")}`
      },
      body: JSON.stringify(body)
    });
    const requestBeaconList = await fetch(`${API_CONFIG.base_path}/beacons/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth-token")}`
      }
    });
    const beaconList = await requestBeaconList.json();

    dispatch({
      type: beaconsReducerActionTypes.EDIT_BEACON_SUCCESS,
      payload: beaconList
    });
  } catch (e) {
    console.error(e);
  }
};
