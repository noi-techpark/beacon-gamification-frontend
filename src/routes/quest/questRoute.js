import { html, LitElement, css } from "lit-element";
import { connect } from "pwa-helpers";
import { showModalAction } from "../../actions/modalsActions";
import {
  deleteQuestAction,
  deleteQuestStepAction,
  getQuestListAction,
  selectQuestAction,
  selectQuestStepAction,
  editQuestStepAction,
  openCreateQuestStep
} from "../../actions/questActions";
import { store } from "../../createStore";
import { buttonStyle } from "../../styles/button";
import { MODAL_IDS } from "../../utils/modals_ids";
import { createQuestForm } from "./components/createQuestForm";
import { createQuestStepForm } from "./components/createQuestStepForm";
import { editQuestForm } from "./components/editQuestForm";
import { editQuestStepForm } from "./components/editQuestStepForm";
import { questStyle } from "./questStyle";

import "../../components/sortableList";
import "../../components/loading-indicator";

class Quest extends connect(store)(LitElement) {
  constructor() {
    super();
    this.questList = [];
    this.createQuestForm = createQuestForm.bind(this);
    this.editQuestForm = editQuestForm.bind(this);
    this.createQuestStepForm = createQuestStepForm.bind(this);
    this.editQuestStepForm = editQuestStepForm.bind(this);
    this.handleOnOrderChange = this.handleOnOrderChange.bind(this);
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
    this.currentQuestStep = { ...questReducer.currentQuestStep };
    this.currentQuest = { ...questReducer.currentQuest };
    this.currentQuestId = questReducer.currentQuestId;
    this.isCreatingQuestStep = questReducer.isCreatingQuestStep;
    this.isFetching = questReducer.isFetching;
  }

  async firstUpdated() {
    store.dispatch(getQuestListAction());
  }

  manageShowQuestModals(id) {
    store.dispatch(showModalAction(id));
  }

  handleOnOrderChange(newSteps) {
    this.currentQuest.steps = newSteps;
    newSteps.forEach((step, i) => {
      store.dispatch(
        editQuestStepAction(step.id, {
          quest_index: i + 1
        })
      );
    });
  }

  mouseEnterDragHandle(e) {
    e.target.parentElement.parentElement.draggable = "true";
  }

  mouseLeaveDragHandle(e) {
    e.target.parentElement.parentElement.removeAttribute("draggable");
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
                    store.dispatch(openCreateQuestStep());
                  }}
                >
                  ➕ Add step
                </button>
              `
            : null}

          <x-sortable-list
            .data=${this.currentQuest && this.currentQuest.steps
              ? this.currentQuest.steps.sort(
                  (a, b) => a.quest_index - b.quest_index
                )
              : []}
            .defaultDraggable=${false}
            .renderElement=${o => {
              return html`
                <div
                  class=${`quest_step ${
                    o.id === this.currentQuestStep.id ? "element_active" : ""
                  }`}
                >
                  <div
                    class="quest_step__content"
                    @click=${() => {
                      store.dispatch(selectQuestStepAction(o.id));
                    }}
                  >
                    <span
                      @mouseenter=${this.mouseEnterDragHandle}
                      @mouseleave=${this.mouseLeaveDragHandle}
                      class="quest_step__content__drag_handle"
                    >
                      ≡</span
                    >
                    <div>
                      <p>Step ${o.quest_index}</p>
                      <p>Name: ${o.name}</p>
                      <p>Points: ${o.value_points}</p>
                    </div>
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
            }}
            .onOrderChange=${this.handleOnOrderChange}
            css=${this.constructor.styles}
          >
          </x-sortable-list>
        </div>
        <div class="quest_steps_details">
          ${this.currentQuestStep && this.currentQuestStep.id
            ? html`
                <div>
                  <h3>Step details:</h3>
                  ${this.editQuestStepForm(store.getState())}
                </div>
              `
            : null}
          ${this.isCreatingQuestStep
            ? html`
                <div>
                  <h3>Create new step:</h3>
                  ${this.createQuestStepForm(store.getState())}
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

      ${this.isFetching
        ? html`
            <x-loading-indicator />
          `
        : null}
    `;
  }
}

customElements.define("x-route-quests", Quest);
