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
      <x-base-question
        title="Single Choice"
        @remove=${this.handleRemove}
        data=${JSON.stringify(this.data)}
        @data=${() => {
          this.dispatchEvent(
            new CustomEvent("data", {
              detail: {
                data: this.getData()
              }
            })
          );
        }}
      >
        <div class="content">
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
              this.updateData();
            }}
          >
            Add Answer
          </button>
        </div>
      </x-base-question>
    `;
  }
}

customElements.define("x-single", Single);
