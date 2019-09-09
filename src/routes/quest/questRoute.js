import { html, LitElement } from "lit-element";
import { showModalAction } from "../../actions/modalsActions";
// import { connect } from "pwa-helpers";
import { API_CONFIG } from "../../config";
import { store } from "../../createStore";
import { buttonStyle } from "../../styles/button";
import { MODAL_IDS } from "../../utils/modals_ids";
// import { store } from "../createStore";
import { questStyle } from "./questStyle";

// class Quest extends connect(store)(LitElement) {
class Quest extends LitElement {
  constructor() {
    super();
    this.quests = [];
    this.selected_quest = {};
  }

  static get styles() {
    return [buttonStyle, questStyle];
  }

  static get properties() {
    return {
      quests: { type: Array },
      selected_quest: { type: Object }
      // show_quest_edit_modal: { type: Boolean },
      // show_quest_step_edit_modal: { type: Boolean }
    };
  }

  stateChanged(state) {
    console.log(state);
    this.show = state.showModal;
  }

  async firstUpdated() {
    const request = await fetch(`${API_CONFIG.base_path}/quest/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth-token")}`
      }
    });
    const response = await request.json();
    this.quests = [...response.results];
  }

  handleQuestClick(quest) {
    this.selected_quest = { ...quest };
  }

  manageShowQuestEditModal() {
    store.dispatch(showModalAction(MODAL_IDS.editQuest));
  }

  render() {
    return html`
      <div class="quest_inspector_container">
        <div class="quest_list">
          <button
            @click=${() => {
              console.log("add quest");
            }}
          >
            ➕ Add quest
          </button>
          ${this.quests.map(o => {
            return html`
              <div class="quest_list__element">
                <p
                  @click=${() => {
                    this.handleQuestClick(o);
                  }}
                >
                  ${o.name}
                </p>
                <button @click=${this.manageShowQuestEditModal}>
                  ✏️
                </button>
              </div>
            `;
          })}

          <x-modal modalId=${MODAL_IDS.editQuest}></x-modal>
        </div>

        <div class="quest_steps_list">
          <button
            @click=${() => {
              console.log("add step");
            }}
          >
            ➕ Add step
          </button>
          ${this.selected_quest.steps
            ? this.selected_quest.steps
                .sort((a, b) => a.quest_index - b.quest_index)
                .map(step => {
                  return html`
                    <div class="quest_step">
                      <div class="quest_step__content">
                        <p>Step ${step.quest_index}</p>
                        <p>Name: ${step.name}</p>
                        <p>Points: ${step.value_points}</p>
                      </div>
                      <button
                        @click=${() => {
                          console.log("Edit");
                        }}
                      >
                        ✏️
                      </button>
                    </div>
                  `;
                })
            : null}
        </div>
      </div>
    `;
  }
}

customElements.define("x-route-quests", Quest);
