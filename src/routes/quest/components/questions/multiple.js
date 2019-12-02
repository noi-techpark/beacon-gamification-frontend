import { html } from "lit-element";
import BaseQuestion from "./base";
import "./inline-answer";

class Multiple extends BaseQuestion {
  constructor() {
    super();
    this.title = "Multiple choice";
  }

  renderAnswers() {
    return html`
      <div class="answers">
        <label>Answers </label>

        ${this.data.options.map(
          (option, i) => html`
            <inline-answer
              value=${option}
              @data=${e => {
                const newValue = e.detail.value;
                if (option === this.data.answer) {
                  this.data.answer = newValue;
                }
                this.data.options[i] = newValue;
                this.updateData();
              }}
              @deleteOption=${() => this.removeOptionAt(i)}
            >
              <input
                type="checkbox"
                slot="select"
                ?checked=${this.data &&
                  this.data.answer &&
                  this.data.answer.includes(option)}
                @input=${e => {
                  if (!Array.isArray(this.data.answer)) {
                    this.data.answer = [];
                  }

                  if (!this.data.answer.includes(option) && e.target.checked) {
                    this.data.answer.push(option);
                  }

                  if (!e.target.checked) {
                    this.data.answer = this.data.answer.filter(
                      a => a !== option
                    );
                  }

                  this.updateData();
                }}
              />
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

customElements.define("x-multiple", Multiple);
