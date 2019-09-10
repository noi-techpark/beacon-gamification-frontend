import { html, LitElement } from "lit-element";
import { connect } from "pwa-helpers";
import { showModalAction } from "../../actions/modalsActions";
import {
  deleteQuestAction,
  getQuestListAction,
  selectQuestAction
} from "../../actions/questActions";
import { store } from "../../createStore";
import { buttonStyle } from "../../styles/button";
import { MODAL_IDS } from "../../utils/modals_ids";
import { createQuestStepForm } from "./components/createQuestStepForm";
import { createQuestForm } from "./components/createQuestForm";
import { editQuestForm } from "./components/editQuestForm";
import { questStyle } from "./questStyle";

class Quest extends connect(store)(LitElement) {
  constructor() {
    super();
    this.questList = [];
    this.createQuestForm = createQuestForm.bind(this);
    this.editQuestForm = editQuestForm.bind(this);
    this.createQuestStepForm = createQuestStepForm.bind(this);
  }

  static get styles() {
    return [buttonStyle, questStyle];
  }

  static get properties() {
    return {
      questList: { type: Array },
      currentQuestId: { type: Number }
    };
  }

  stateChanged({ questReducer }) {
    if (questReducer.questList.results) {
      this.questList = questReducer.questList.results;
    }
    this.currentQuestId = questReducer.currentQuestId;
  }

  async firstUpdated() {
    store.dispatch(getQuestListAction());
  }

  manageShowQuestModals(id) {
    store.dispatch(showModalAction(id));
  }

  render() {
    const selected_quest = this.currentQuestId
      ? this.questList.find(o => o.id === this.currentQuestId)
      : {};

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
              <div class="quest_list__element">
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
          <button
            @click=${() => {
              // console.log("add step");
              this.manageShowQuestModals(MODAL_IDS.createQuestStep);
            }}
          >
            ➕ Add step
          </button>
          ${selected_quest.steps
            ? selected_quest.steps
                .sort((a, b) => a.quest_index - b.quest_index)
                .map(step => {
                  return html`
                    <div class="quest_step">
                      <div class="quest_step__content">
                        <p>Step ${step.quest_index}</p>
                        <p>Name: ${step.name}</p>
                        <p>Points: ${step.value_points}</p>
                      </div>
                      <div>
                        <button
                          @click=${() => {
                            console.log("Edit");
                          }}
                        >
                          ✏️
                        </button>
                        <button
                          @click=${() => {
                            console.log("Delete");
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
        title="Create quest step"
        .contentFunction=${this.createQuestStepForm}
      ></x-modal>
    `;
  }
}

customElements.define("x-route-quests", Quest);
