import { LitElement, html } from "lit-element";
import "./questions/single";
import "./questions/text";
import "./questions/number";
import "./questions/multiple";

class QuestionForm extends LitElement {
  connectedCallback() {
    super.connectedCallback();

    if (!Array.isArray(this.questions)) {
      if (this.questions) {
        this.questions = [this.questions];
      } else {
        this.questions = [];
      }
    }

    this.requestUpdate();
  }

  static get properties() {
    return {
      questions: { type: Array }
    };
  }

  addQuestion() {
    const kind = this.shadowRoot.querySelector("select").value;
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
        </select>
        <button @click=${this.addQuestion}>Add question</button>
      </div>
    `;
  }
}

customElements.define("question-form", QuestionForm);
