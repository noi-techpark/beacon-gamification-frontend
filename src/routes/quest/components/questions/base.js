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
        display: flex;
        flex-direction: column;
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
      .answers {
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

  removeOptionAt(i) {
    this.data.options = this.data.options.filter((_, j) => i !== j);
    this.requestUpdate();
  }

  renderAnswers() {
    return html`
      <p>renderAnswers()</p>
    `;
  }

  render() {
    return html`
      <div class="header">
        <h3>${this.title}</h3>
        <span @click=${this.handleRemove}>❌</span>
      </div>
      <label for="question">Question </label>
      <textarea
        name="question"
        rows="4"
        @input=${e => {
          this.data.question = e.target.value;
          this.updateData();
        }}
      >
${this.data.question}</textarea
      >
      ${this.renderAnswers()}

      <label for="finder">Finder</label>
      <input
        name="finder"
        value=${this.data.finder}
        type="string"
        @input="${e => {
          this.data.finder = e.target.value;
          this.updateData();
        }}"
      />

      <label for="wrongAnswerMessage">Wrong Answer Message </label>
      <input
        name="wrongAnswerMessage"
        value=${this.data.wrongAnswerMessage}
        type="string"
        @input=${e => {
          this.data.wrongAnswerMessage = e.target.value;
          this.updateData();
        }}
      />

      <label for="correctAnswerMessage">Correct Answer Message </label>
      <input
        name="correctAnswerMessage"
        value=${this.data.correctAnswerMessage}
        type="string"
        @input=${e => {
          this.data.correctAnswerMessage = e.target.value;
          this.updateData();
        }}
      />

      <label for="help">Help </label>
      <input
        name="help"
        value=${this.data.help}
        type="string"
        @input=${e => {
          this.data.help = e.target.value;
          this.updateData();
        }}
      />

      <textarea>${JSON.stringify(this.data)}</textarea>
    `;
  }
}

customElements.define("x-base-question", BaseQuestion);
