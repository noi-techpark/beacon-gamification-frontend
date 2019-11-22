import { LitElement, html, css } from "lit-element";

export default class BaseQuestion extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    if (!this.data) this.data = {};
    if (!this.data.options) this.data.options = [];
  }

  static get properties() {
    return {
      title: { type: String },
      data: { type: Object }
    };
  }

  static get styles() {
    return css`
      :host {
        border: 1px solid gray;
        padding: 5px;
      }
      .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .header * {
        margin: 0px;
        display: inline-block;
      }
      :host {
        display: flex;
        flex-direction: column;
      }
    `;
  }

  updateData() {
    this.dispatchEvent(
      new CustomEvent("data", {
        detail: {
          data: this.data
        }
      })
    );
    this.requestUpdate();
  }

  handleRemove() {
    this.dispatchEvent(new CustomEvent("remove", { detail: { boh: "ok" } }));
  }

  render() {
    return html`
      <div class="header">
        <h3>${this.title}</h3>
        <span @click=${this.handleRemove}>❌</span>
      </div>
      <slot></slot>

      <label for="finder">Finder</label>
      <input
        name="finder"
        type="string"
        @input="${e => {
          this.data.finder = e.target.value;
          this.requestUpdate();
        }}"
      />

      <label for="wrongAnswerMessage">Wrong Answer Message </label>
      <input
        name="wrongAnswerMessage"
        type="string"
        @input=${e => {
          this.data.wrongAnswerMessage = e.target.value;
          this.requestUpdate();
        }}
      />

      <label for="correctAnswerMessage">Correct Answer Message </label>
      <input
        name="correctAnswerMessage"
        type="string"
        @input=${e => {
          this.data.correctAnswerMessage = e.target.value;
          this.requestUpdate();
        }}
      />

      <label for="help">Help </label>
      <input
        name="help"
        type="string"
        @input=${e => {
          this.data.help = e.target.value;
          this.requestUpdate();
        }}
      />

      JSON: ${JSON.stringify(this.data)}
    `;
  }
}

customElements.define("x-base-question", BaseQuestion);
