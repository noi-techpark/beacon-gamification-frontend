import { html, LitElement } from "lit-element";
import { connect } from "pwa-helpers";
import { showModalAction } from "../../actions/modalsActions";
import {
  deleteQuestAction,
  deleteQuestStepAction,
  getQuestListAction,
  selectQuestAction,
  selectQuestStepAction
} from "../../actions/questActions";
import { store } from "../../createStore";
import { buttonStyle } from "../../styles/button";
import { MODAL_IDS } from "../../utils/modals_ids";
import { createQuestForm } from "./components/createQuestForm";
import { createQuestStepForm } from "./components/createQuestStepForm";
import { editQuestForm } from "./components/editQuestForm";
import { editQuestStepForm } from "./components/editQuestStepForm";
import { questStyle } from "./questStyle";

class Quest extends connect(store)(LitElement) {
  constructor() {
    super();
    this.questList = [];
    this.createQuestForm = createQuestForm.bind(this);
    this.editQuestForm = editQuestForm.bind(this);
    this.createQuestStepForm = createQuestStepForm.bind(this);
    this.editQuestStepForm = editQuestStepForm.bind(this);
  }

  static get styles() {
    return [buttonStyle, questStyle];
  }

  static get properties() {
    return {
      questList: { type: Array },
      currentQuestId: { type: Number },
      currentQuest: { type: Object },
      currentQuestStep: { type: Object }
    };
  }

  stateChanged({ questReducer }) {
    if (questReducer.questList.results) {
      this.questList = [...questReducer.questList.results];
    }
    if (questReducer.currentQuestStep) {
      this.currentQuestStep = { ...questReducer.currentQuestStep };
    }
    if (questReducer.currentQuest) {
      this.currentQuest = { ...questReducer.currentQuest };
    }
    if (questReducer.currentQuestId) {
      this.currentQuestId = questReducer.currentQuestId;
    }
  }

  async firstUpdated() {
    store.dispatch(getQuestListAction());
  }

  manageShowQuestModals(id) {
    store.dispatch(showModalAction(id));
  }

  render() {
    return html`
      <div class="quest_inspector_container">
        <div class="quest_list">
          <button
            @click=${() => this.manageShowQuestModals(MODAL_IDS.createQuest)}
          >
            ➕ Add quest
          </button>
          ${this.questList.map(o => {
            return html`
              <div
                class=${`quest_list__element ${
                  this.currentQuest && o.id === this.currentQuest.id
                    ? "element_active"
                    : ""
                }`}
              >
                <p
                  @click=${() => {
                    store.dispatch(selectQuestAction(o.id));
                  }}
                >
                  ${o.name} <br />
                  <small>
                    ${o.position}
                  </small>
                </p>
                <div>
                  <button
                    @click=${() => {
                      store.dispatch(selectQuestAction(o.id));
                      this.manageShowQuestModals(MODAL_IDS.editQuest);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    @click=${() => {
                      const result = confirm("Want to delete?");
                      if (result) {
                        store.dispatch(deleteQuestAction(o.id));
                      }
                    }}
                  >
                    ❌
                  </button>
                </div>
              </div>
            `;
          })}
        </div>

        <div class="quest_steps_list">
          ${Boolean(this.currentQuestId)
            ? html`
                <button
                  @click=${() => {
                    this.manageShowQuestModals(MODAL_IDS.createQuestStep);
                  }}
                >
                  ➕ Add step
                </button>
              `
            : null}
          ${this.currentQuest
            ? this.currentQuest.steps
                .sort((a, b) => a.quest_index - b.quest_index)
                .map(o => {
                  return html`
                    <div
                      class=${`quest_step ${
                        o.id === this.currentQuestStep.id
                          ? "element_active"
                          : ""
                      }`}
                    >
                      <div
                        class="quest_step__content"
                        @click=${() => {
                          store.dispatch(selectQuestStepAction(o.id));
                        }}
                      >
                        <p>Step ${o.quest_index}</p>
                        <p>Name: ${o.name}</p>
                        <p>Points: ${o.value_points}</p>
                      </div>
                      <div>
                        <button
                          @click=${() => {
                            store.dispatch(selectQuestStepAction(o.id));
                            this.manageShowQuestModals(MODAL_IDS.editQuestStep);
                          }}
                        >
                          ✏️
                        </button>
                        <button
                          @click=${() => {
                            const result = confirm("Want to delete?");
                            if (result) {
                              store.dispatch(deleteQuestStepAction(o.id));
                            }
                          }}
                        >
                          ❌
                        </button>
                      </div>
                    </div>
                  `;
                })
            : null}
        </div>
        <div class="quest_steps_details">
          ${this.currentQuestStep && this.currentQuestStep.id
            ? html`
                <div>
                  <h3>Step details:</h3>
                  <p class=""><small>beacon</small></p>
                  <p>${this.currentQuestStep.beacon || "-- Empty --"}</p>

                  <p><small>quest_index</small></p>
                  <p>${this.currentQuestStep.quest_index || "-- Empty --"}</p>

                  <p><small>type</small></p>
                  <p>${this.currentQuestStep.type || "-- Empty --"}</p>

                  <p><small>name</small></p>
                  <p>${this.currentQuestStep.name || "-- Empty --"}</p>

                  <p><small>instructions</small></p>
                  <p>${this.currentQuestStep.instructions || "-- Empty --"}</p>

                  <p><small>properties</small></p>
                  <p>${this.currentQuestStep.properties || "-- Empty --"}</p>

                  <p><small>value_points</small></p>
                  <p>${this.currentQuestStep.value_points || "-- Empty --"}</p>

                  <p><small>value_points_error</small></p>
                  <p>
                    ${this.currentQuestStep.value_points_error || "-- Empty --"}
                  </p>
                </div>
              `
            : null}
        </div>
      </div>

      <x-modal
        modalId=${MODAL_IDS.createQuest}
        title="Create a quest"
        .contentFunction=${this.createQuestForm}
      >
      </x-modal>
      <x-modal
        modalId=${MODAL_IDS.editQuest}
        title="Edit quest"
        .contentFunction=${this.editQuestForm}
      ></x-modal>
      <x-modal
        modalId=${MODAL_IDS.createQuestStep}
        title=${`Create quest step for ${
          this.currentQuest ? this.currentQuest.name : ""
        }`}
        .contentFunction=${this.createQuestStepForm}
      ></x-modal>
      <x-modal
        modalId=${MODAL_IDS.editQuestStep}
        title=${`Edit quest step`}
        .contentFunction=${this.editQuestStepForm}
      ></x-modal>
    `;
  }
}

customElements.define("x-route-quests", Quest);
