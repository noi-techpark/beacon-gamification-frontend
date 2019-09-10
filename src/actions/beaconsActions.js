import { API_CONFIG } from "../config";
import { beaconsReducerActionTypes } from "../reducers/beaconsReducer";

export const getBeaconListAction = () => async (dispatch, getState) => {
  try {
    const requestBeaconList = await fetch(`${API_CONFIG.base_path}/beacons/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth-token")}`
      }
    });
    const beaconList = await requestBeaconList.json();

    dispatch({
      type: beaconsReducerActionTypes.GET_BEACON_LIST_SUCCESS,
      payload: beaconList
    });
  } catch (e) {
    console.error(e);
  }
};
