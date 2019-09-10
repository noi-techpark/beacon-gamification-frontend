import { html } from "lit-html";
import { createQuestStepAction } from "../../../actions/questActions";
import { store } from "../../../createStore";

export function createQuestStepForm(state) {
  const { currentQuest } = state.questReducer;

  let newQuestStepName = "";
  let newQuestStepProperties = "";
  let newQuestStepValue_points = "";
  let newQuestStepQuest_index = "";
  let newQuestStepType = "";
  let newQuestStepInstructions = "";
  // let newQuestStepQuest = "";
  let newQuestStepBeacon = "";

  return html`
    <form
      action=""
      @submit=${e => {
        e.preventDefault();
        if (
          newQuestStepName &&
          newQuestStepProperties &&
          newQuestStepValue_points &&
          newQuestStepQuest_index &&
          newQuestStepType &&
          newQuestStepInstructions &&
          // newQuestStepQuest &&
          newQuestStepBeacon
        ) {
          store.dispatch(
            createQuestStepAction({
              name: newQuestStepName,
              properties: newQuestStepProperties,
              value_points: newQuestStepValue_points,
              quest_index: newQuestStepQuest_index,
              type: newQuestStepType,
              instructions: newQuestStepInstructions,
              quest: currentQuest.id,
              beacon: newQuestStepBeacon
            })
          );
        } else {
          alert("Missing fields");
        }
      }}
    >
      <label>Name</label>
      <input
        value=${newQuestStepName}
        @keyup=${e => {
          newQuestStepName = e.target.value;
        }}
        name="name"
      />

      <label>Type</label>
      <input
        value=${newQuestStepType}
        @keyup=${e => {
          newQuestStepType = e.target.value;
        }}
        name="type"
      />

      <label>Instructions <small>text of the step</small></label>
      <input
        value=${newQuestStepInstructions}
        @keyup=${e => {
          newQuestStepInstructions = e.target.value;
        }}
        name="instructions"
      />

      <label>Properties <small>content of the step</small></label>
      <textarea
        rows="4"
        value=${newQuestStepProperties}
        @keyup=${e => {
          newQuestStepProperties = e.target.value;
        }}
        name="properties"
      ></textarea>

      <label>Value Points</label>
      <input
        value=${newQuestStepValue_points}
        @keyup=${e => {
          newQuestStepValue_points = e.target.value;
        }}
        name="value_points"
      />

      <label>Quest Index <small>ordering number</small></label>
      <input
        value=${newQuestStepQuest_index}
        @keyup=${e => {
          newQuestStepQuest_index = e.target.value;
        }}
        name="quest_index"
      />

      <label>Beacon <small>associate</small></label>
      <input
        value=${newQuestStepBeacon}
        @keyup=${e => {
          newQuestStepBeacon = e.target.value;
        }}
        name="beacon"
      />

      <button submit class="full_width submit">
        Edit
      </button>
    </form>
  `;
}