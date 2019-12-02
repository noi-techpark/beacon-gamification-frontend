import { html } from "lit-element";
import BaseQuestion from "./base";
import "./inline-answer";

class Text extends BaseQuestion {
  constructor() {
    super();
    this.title = "Text question";
  }

  renderAnswers() {
    return html`
      <div class="answers">
        <label>Answer </label>
        <input
          @input=${e => this.setAnswer(e.target.value)}
          value=${this.data.answer}
        />
      </div>
    `;
  }
}

customElements.define("x-text", Text);
