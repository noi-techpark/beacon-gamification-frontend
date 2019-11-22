import { html, css } from "lit-element";
import BaseQuestion from "./base";
import "./inline-answer";

class Single extends BaseQuestion {
  static get styles() {
    return css`
      .content {
        display: flex;
        flex-direction: column;
      }
    `;
  }

  render() {
    return html`
      <x-base-question title="Single Choice">
        <div class="content">
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
              >
              </inline-answer>
            `
          )}
          <button
            @click=${() => {
              this.data.options.push("");
              this.requestUpdate();
            }}
          >
            Add Answer
          </button>
        </div>
        ${JSON.stringify(this.data)}
      </x-base-question>
    `;
  }
}

customElements.define("x-single", Single);
