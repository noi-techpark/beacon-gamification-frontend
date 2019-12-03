import { html, css } from "lit-element";
import BaseQuestion from "./base";
import "./inline-answer";

class Order extends BaseQuestion {
  constructor() {
    super();
    this.title = "Order question";
  }

  mouseEnter(e) {
    e.target.parentElement.draggable = "true";
  }

  mouseLeave(e) {
    e.target.parentElement.removeAttribute("draggable");
  }

  removeOptionAt(i) {
    this.data.options = this.data.options.filter((_, j) => i !== j);
    this.data.answer = this.data.answer.filter((_, j) => i !== j);
    this.updateData();
  }

  renderList(data, onOrderChange, onElementEdit) {
    return html`
      <x-sortable-list
        .data=${data}
        .onOrderChange=${onOrderChange}
        .defaultDraggable=${false}
        .renderElement=${(option, i) => html`
          <inline-answer
            .value=${option}
            @data=${e => onElementEdit(e, option)}
            @deleteOption=${() => this.removeOptionAt(i)}
          >
            <span
              slot="select"
              @mouseenter=${this.mouseEnter}
              @mouseleave=${this.mouseLeave}
              style=${css`
                font-size: 30px;
              `}
            >
              ≡</span
            >
          </inline-answer>
        `}
      >
      </x-sortable-list>
    `;
  }

  renderAnswers() {
    return html`
      <div class="answers">
        <label>Answers in correct order </label>
        ${this.renderList(
          this.data.answer,
          newData => {
            this.data.answer = newData;
            this.updateData();
          },
          (e, option) => {
            const newValue = e.detail.value;

            const answerIndex = this.data.answer.findIndex(o => o === option);
            this.data.answer[answerIndex] = newValue;

            const optionsIndex = this.data.options.findIndex(o => o === option);
            this.data.options[optionsIndex] = newValue;

            this.updateData();
          }
        )}
        <button
          @click=${() => {
            this.data.options.push("");
            this.data.answer.push("");
            this.updateData();
          }}
        >
          Add Answer
        </button>

        <label>Answers ordered as shown to the user </label>

        ${this.renderList(
          this.data.options,
          newData => {
            this.data.options = newData;
            this.updateData();
          },
          (e, option) => {
            const newValue = e.detail.value;

            const answerIndex = this.data.answer.findIndex(o => o === option);
            this.data.answer[answerIndex] = newValue;

            const optionsIndex = this.data.options.findIndex(o => o === option);
            this.data.options[optionsIndex] = newValue;

            this.updateData();
          }
        )}
        >
        </x-sortable-list>
      </div>
    `;
  }
}

customElements.define("x-order", Order);
