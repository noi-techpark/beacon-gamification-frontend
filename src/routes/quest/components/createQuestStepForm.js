import { html } from "lit-html";
import { createQuestStepAction } from "../../../actions/questActions";
import { store } from "../../../createStore";

export function createQuestStepForm(state) {
  const { currentQuest } = state.questReducer;
  const { beaconList } = state.beaconsReducer;

  let newQuestStepName = "";
  let newQuestStepProperties = "";
  let newQuestStepValue_points = "";
  let newQuestStepValue_points_error = "";
  let newQuestStepQuest_index = "";
  let newQuestStepType = "";
  let newQuestStepInstructions = "";
  let newQuestStepBeacon = "";
  let newImage = "";

  return html`
    <form
      action=""
      @submit=${e => {
        e.preventDefault();
        if (
          newQuestStepName &&
          newQuestStepProperties &&
          newQuestStepValue_points &&
          newQuestStepValue_points_error &&
          newQuestStepQuest_index &&
          newQuestStepInstructions &&
          newQuestStepBeacon
        ) {
          store.dispatch(
            createQuestStepAction({
              name: newQuestStepName,
              properties: newQuestStepProperties,
              value_points: newQuestStepValue_points,
              value_points_error: newQuestStepValue_points_error,
              quest_index: newQuestStepQuest_index,
              instructions: newQuestStepInstructions,
              quest: currentQuest.id,
              beacon: newQuestStepBeacon,
              image: newImage
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
        questions=${"[]"}
        @data=${e => {
          newQuestStepProperties = JSON.stringify(e.detail.questions);
          newQuestStepType = Array.isArray(e.detail.questions)
            ? "multi"
            : "question";
        }}
      ></question-form>

      <label>Value Points</label>
      <input
        value=${newQuestStepValue_points}
        @keyup=${e => {
          newQuestStepValue_points = e.target.value;
        }}
        name="value_points"
      />

      <label>Error Value Points <small>(only negative)</small></label>
      <input
        value=${newQuestStepValue_points_error}
        @input=${e => {
          if (e.target.value > 0) {
            e.target.style.border = "1px solid red";
          } else {
            e.target.style.border = "";
          }
          newQuestStepValue_points_error = e.target.value;
        }}
        type="number"
        name="value_points_error"
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
            <option value=${o.id}>${o.name}</option>
          `;
        })}
      </select>

      <input
        type="file"
        accept="image/*"
        @change=${e => {
          newImage = e.target.files[0];
        }}
      />

      <button submit class="full_width submit">
        Create
      </button>
    </form>
  `;
}
