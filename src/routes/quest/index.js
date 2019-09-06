import { LitElement, html, css } from "lit-element";
import { API_CONFIG } from "../../config";
import { buttonStyle } from "../../styles/button";
import { questStyle } from "./questStyle";

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

  render() {
    return html`
      <div class="quest_inspector_container">
        <div class="quest_list">
          <button
            @click=${() => {
              console.log("add quest");
            }}
          >
            + Add quest
          </button>
          ${this.quests.map(o => {
            return html`
              <div
                class="quest_list__element"
                @click=${() => {
                  this.handleQuestClick(o);
                }}
              >
                <p>
                  ${o.name}
                </p>
              </div>
            `;
          })}
        </div>
        <div class="quest_steps_list">
          ${this.selected_quest.steps
            ? this.selected_quest.steps.map(step => {
                return html`
                  <div class="quest_step">
                    <p>Step ${step.quest_index}</p>
                    <p>Name: ${step.name}</p>
                    <p>Points: ${step.value_points}</p>
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
