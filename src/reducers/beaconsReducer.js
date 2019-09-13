export const beaconsReducerActionTypes = {
  GET_BEACON_LIST_SUCCESS: "GET_BEACON_LIST_SUCCESS",
  CREATE_BEACON_SUCCESS: "CREATE_BEACON_SUCCESS",
  DELETE_BEACON_SUCCESS: "DELETE_BEACON_SUCCESS"
};

const INITIAL_STATE = {
  beaconList: {}
};

export const beaconsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case beaconsReducerActionTypes.CREATE_BEACON_SUCCESS:
      return {
        ...state,
        beaconList: { ...action.payload }
      };
    case beaconsReducerActionTypes.GET_BEACON_LIST_SUCCESS:
      return {
        ...state,
        beaconList: { ...action.payload }
      };
    case beaconsReducerActionTypes.DELETE_BEACON_SUCCESS:
      return {
        ...state,
        beaconList: { ...action.payload }
      };

    default:
      return state;
  }
};
