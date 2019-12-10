import { LitElement, html } from "lit-element";
import "./questions/single";
import "./questions/text";
import "./questions/number";
import "./questions/multiple";
import "./questions/order";
import "./questions/image";

class QuestionForm extends LitElement {
  static get properties() {
    return {
      questions: { type: Array }
    };
  }

  addQuestion() {
    const kindSelectElement = this.shadowRoot.querySelector("select");
    if (!kindSelectElement) {
      console.error("Select for question kind found");
      return;
    }
    const kind = kindSelectElement.value;
    this.questions = [...this.questions, { kind }];
    this.updateData();
  }

  editQuestion(i, data) {
    this.questions[i] = data;
    this.updateData();
  }

  removeQuestion(i) {
    this.questions = this.questions.filter((_, j) => i !== j);
    this.updateData();
  }

  updateData() {
    this.dispatchEvent(
      new CustomEvent("data", {
        detail: {
          questions:
            this.questions.length === 1 ? this.questions[0] : this.questions
        }
      })
    );
    this.requestUpdate();
  }

  render() {
    if (!Array.isArray(this.questions)) {
      if (this.questions) {
        this.questions = [this.questions];
      } else {
        this.questions = [];
      }
    }
    return html`
      <div>
        ${this.questions.map((question, i) => {
          switch (question.kind) {
            case "single":
              return html`
                <x-single
                  data="${JSON.stringify(question)}"
                  @data=${e => this.editQuestion(i, e.detail.data)}
                  @remove=${() => this.removeQuestion(i)}
                ></x-single>
              `;
            case "text":
              return html`
                <x-text
                  data="${JSON.stringify(question)}"
                  @data=${e => this.editQuestion(i, e.detail.data)}
                  @remove=${() => this.removeQuestion(i)}
                ></x-text>
              `;
            case "number":
              return html`
                <x-number
                  data="${JSON.stringify(question)}"
                  @data=${e => this.editQuestion(i, e.detail.data)}
                  @remove=${() => this.removeQuestion(i)}
                ></x-number>
              `;
            case "multiple":
              return html`
                <x-multiple
                  data="${JSON.stringify(question)}"
                  @data=${e => this.editQuestion(i, e.detail.data)}
                  @remove=${() => this.removeQuestion(i)}
                ></x-multiple>
              `;
            case "order":
              return html`
                <x-order
                  data="${JSON.stringify(question)}"
                  @data=${e => this.editQuestion(i, e.detail.data)}
                  @remove=${() => this.removeQuestion(i)}
                ></x-order>
              `;
            case "image":
              return html`
                <x-image
                  data="${JSON.stringify(question)}"
                  @data=${e => this.editQuestion(i, e.detail.data)}
                  @remove=${() => this.removeQuestion(i)}
                ></x-image>
              `;
            default:
              return html`
                <p>Form for ${question.kind} not implemented yet</p>
              `;
          }
        })}
        <select>
          <option>single</option>
          <option>multiple</option>
          <option>order</option>
          <option>text</option>
          <option>image</option>
        </select>
        <button @click=${this.addQuestion}>Add question</button>
      </div>
    `;
  }
}

customElements.define("question-form", QuestionForm);
