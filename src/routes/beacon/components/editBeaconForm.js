import { html } from "lit-html";
import { editBeaconAction } from "../../../actions/beaconsActions";
import { store } from "../../../createStore";

export function editBeaconForm(state) {
  const { currentBeacon } = state.beaconsReducer;

  let newBeaconName = currentBeacon.name;
  let newBeaconId = currentBeacon.beacon_id;

  return html`
    <form
      action=""
      @submit=${e => {
        e.preventDefault();
        store.dispatch(
          editBeaconAction(currentBeacon.id, {
            name: newBeaconName,
            beacon_id: newBeaconId
          })
        );
      }}
    >
      <label>Name</label>
      <input
        value=${newBeaconName}
        @change=${e => {
          newBeaconName = e.target.value;
        }}
        type="text"
      />

      <label>Id</label>
      <input
        value=${newBeaconId}
        @change=${e => {
          newBeaconId = e.target.value;
        }}
        type="text"
      />
      <button submit class="full_width submit">
        Save
      </button>
    </form>
  `;
}
