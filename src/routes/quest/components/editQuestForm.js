import { html } from "lit-html";
import { store } from "../../../createStore";
import { editQuestAction } from "../../../actions/questActions";

export function editQuestForm(state) {
  const { currentQuest } = state.questReducer;

  let newQuestName = currentQuest.name;
  let newQuestPosition = currentQuest.position;
  return html`
    <form
      action=""
      @submit=${e => {
        e.preventDefault();
        store.dispatch(
          editQuestAction(questId, {
            name: newQuestName,
            position: newQuestPosition
          })
        );
      }}
    >
      <label>Name</label>
      <input
        value=${newQuestName}
        @change=${e => {
          newQuestName = e.target.value;
        }}
        type="name"
      />
      <label>Position</label>
      <input
        value=${newQuestPosition}
        @change=${e => {
          newQuestPosition = e.target.value;
        }}
        type="position"
      />
      <button submit class="full_width submit">
        Edit
      </button>
    </form>
  `;
}
