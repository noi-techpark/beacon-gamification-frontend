import { html } from "lit-html";
import { editQuestStepAction } from "../../../actions/questActions";
import { store } from "../../../createStore";
import "./questionForm";

export function editQuestStepForm(state) {
  const { beaconList } = state.beaconsReducer;
  const { currentQuestStep } = state.questReducer;

  let newQuestStepName = currentQuestStep ? currentQuestStep.name : "";
  let newQuestStepProperties = currentQuestStep
    ? currentQuestStep.properties
    : "";
  let newQuestStepValue_points = currentQuestStep
    ? currentQuestStep.value_points
    : "";
  let newQuestStepQuest_index = currentQuestStep
    ? currentQuestStep.quest_index
    : "";
  let newQuestStepType = currentQuestStep ? currentQuestStep.type : "";
  let newQuestStepInstructions = currentQuestStep
    ? currentQuestStep.instructions
    : "";
  let newQuestStepBeacon = currentQuestStep ? currentQuestStep.beacon : "";

  console.log(newQuestStepProperties);

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
          newQuestStepBeacon
        ) {
          store.dispatch(
            editQuestStepAction(currentQuestStep.id, {
              name: newQuestStepName,
              properties: newQuestStepProperties,
              value_points: newQuestStepValue_points,
              quest_index: newQuestStepQuest_index,
              type: newQuestStepType,
              instructions: newQuestStepInstructions,
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

      <question-form
        questions=${newQuestStepProperties}
        @data=${e => {
          newQuestStepProperties = JSON.stringify(e.detail.questions);
          this.requestUpdate();
        }}
      ></question-form>

      <!-- here to make debug easy -->
      <!-- textarea>${newQuestStepProperties}</textarea -->

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
      <select
        name="beacon"
        id=""
        @change=${e => {
          newQuestStepBeacon = e.target.value;
        }}
      >
        <option value="">-- Choose one --</option>
        ${beaconList.results.map(o => {
          return html`
            <option value=${o.id} ?selected=${newQuestStepBeacon === o.id}
              >${o.name}</option
            >
          `;
        })}
      </select>

      <button submit class="full_width submit">
        Edit
      </button>
    </form>
  `;
}
