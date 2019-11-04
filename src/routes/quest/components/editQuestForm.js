import { html } from "lit-html";
import { store } from "../../../createStore";
import { editQuestAction } from "../../../actions/questActions";

export function editQuestForm(state) {
  const { currentQuest } = state.questReducer;

  let newQuestName = currentQuest.name;
  let newQuestPosition = currentQuest.position;
  let newQuestDescription = currentQuest.description;
  let newQuestEpilogue = currentQuest.epilogue;
  let newQuestInstructions = currentQuest.instructions;

  return html`
    <form
      action=""
      @submit=${e => {
        e.preventDefault();
        store.dispatch(
          editQuestAction(currentQuest.id, {
            name: newQuestName,
            position: newQuestPosition,
            description: newQuestDescription,
            epilogue: newQuestEpilogue,
            instructions: newQuestInstructions
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
      <label>Instructions</label>
      <textarea
        @change=${e => {
          newQuestInstructions = e.target.value;
        }}
        name=""
        id=""
        rows="10"
      >
${newQuestInstructions}</textarea
      >
      <label>Description</label>
      <textarea
        @change=${e => {
          newQuestDescription = e.target.value;
        }}
        name=""
        id=""
        rows="10"
      >
${newQuestDescription}</textarea
      >
      <label>Epilogue</label>
      <textarea
        @change=${e => {
          newQuestEpilogue = e.target.value;
        }}
        name=""
        id=""
        rows="10"
      >
${newQuestEpilogue}</textarea
      >
      <button submit class="full_width submit">
        Edit
      </button>
    </form>
  `;
}
