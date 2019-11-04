import { html } from "lit-html";
import { createBeaconAction } from "../../../actions/beaconsActions";
import { store } from "../../../createStore";

export function createBeaconForm() {
  let newBeaconName = "";
  let newBeaconId = "";
  return html`
    <form
      action=""
      @submit=${e => {
        e.preventDefault();
        store.dispatch(
          createBeaconAction({
            name: newBeaconName,
            beacon_id: newBeaconId
          })
        );
      }}
    >
      <label>Name</label>
      <input
        @change=${e => {
          newBeaconName = e.target.value;
        }}
        type="name"
      />
      <label>Id</label>
      <input
        @change=${e => {
          newBeaconId = e.target.value;
        }}
        type="position"
      />
      <button submit class="full_width submit">
        Create
      </button>
    </form>
  `;
}
