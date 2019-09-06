import { html, LitElement } from "lit-element";
import { API_CONFIG } from "../../config";
import { buttonStyle } from "../../styles/button";
import { questStyle } from "./questStyle";

import { connect } from "pwa-helpers";
import { store } from "../createStore";
import { modalsReducerActionTypes } from "../../reducers/modals";

class Quest extends connect(store)(LitElement) {
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
      selected_quest: { type: Object },
      show_quest_edit_modal: { type: Boolean },
      show_quest_step_edit_modal: { type: Boolean }
    };
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
    console.log("Edit");
    // this.show_quest_edit_modal = !this.show_quest_edit_modal;
    store.dispatch({ type: modalsReducerActionTypes.SHOW_MODAL });
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

          <x-modal
            showManage=${this.manageShowQuestEditModal}
            show=${this.show_quest_edit_modal}
            modalId="editQuest"
          ></x-modal>
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
