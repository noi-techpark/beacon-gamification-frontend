import { html } from "lit-html";
import { store } from "../../../createStore";
import { createQuestAction } from "../../../actions/questActions";

export function createQuestForm() {
  let newQuestName = "";
  let newQuestPosition = "";
  return html`
    <form
      action=""
      @submit=${e => {
        e.preventDefault();
        store.dispatch(
          createQuestAction({
            name: newQuestName,
            position: newQuestPosition
          })
        );
      }}
    >
      <label>Name</label>
      <input
        @change=${e => {
          newQuestName = e.target.value;
        }}
        type="name"
      />
      <label>Position</label>
      <input
        @change=${e => {
          newQuestPosition = e.target.value;
        }}
        type="position"
      />
      <button submit class="full_width submit">
        Create
      </button>
    </form>
  `;
}
