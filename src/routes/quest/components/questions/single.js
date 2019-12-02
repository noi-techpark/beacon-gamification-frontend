import { html } from "lit-element";
import BaseQuestion from "./base";
import "./inline-answer";

class Single extends BaseQuestion {
  constructor() {
    super();
    this.title = "Single choice";
  }

  renderAnswers() {
    return html`
      <div class="answers">
        <label>Answers </label>

        ${this.data.options.map(
          (option, i) => html`
            <inline-answer
              value=${option}
              ?selected=${option === this.data.answer}
              @data=${e => {
                const newValue = e.detail.value;
                if (option === this.data.answer) {
                  this.data.answer = newValue;
                }
                this.data.options[i] = newValue;
                this.updateData();
              }}
              @selectAnswer=${e => {
                const selected = e.detail.value;
                this.data.answer = selected;
                this.updateData();
              }}
              @deleteOption=${() => this.removeOptionAt(i)}
            >
            </inline-answer>
          `
        )}
        <button
          @click=${() => {
            this.data.options.push("");
            this.updateData();
          }}
        >
          Add Answer
        </button>
      </div>
    `;
  }
}

customElements.define("x-single", Single);
