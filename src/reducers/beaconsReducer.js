export const beaconsReducerActionTypes = {
  GET_BEACON_LIST_SUCCESS: "GET_BEACON_LIST_SUCCESS",
  CREATE_BEACON_SUCCESS: "CREATE_BEACON_SUCCESS",
  DELETE_BEACON_SUCCESS: "DELETE_BEACON_SUCCESS",
  SELECT_CURRENT_BEACON: "SELECT_CURRENT_BEACON",
  EDIT_BEACON_SUCCESS: "EDIT_BEACON_SUCCESS"
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

    case beaconsReducerActionTypes.EDIT_BEACON_SUCCESS:
      return {
        ...state,
        beaconList: { ...action.payload }
      };

    case beaconsReducerActionTypes.SELECT_CURRENT_BEACON:
      const currentBeacon = state.beaconList.results.find(
        o => o.id === action.payload
      );

      return {
        ...state,
        currentBeacon,
        currentBeaconId: action.payload
      };

    default:
      return state;
  }
};
