import { html } from "lit-element";
import BaseQuestion from "./base";
import "./inline-answer";

class Number extends BaseQuestion {
  constructor() {
    super();
    this.title = "Numeric question";
  }

  renderAnswers() {
    return html`
      <div class="answers">
        <label>Answer </label>
        <input
          @input=${e => this.setAnswer(e.target.value)}
          value=${this.data.answer}
          type="number"
        />
      </div>
    `;
  }
}

customElements.define("x-number", Number);
