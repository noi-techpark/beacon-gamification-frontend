import { LitElement, html } from "lit-element";
import "./questions/single";

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
    const type = this.shadowRoot.querySelector("select").value;
    this.questions = [...this.questions, { type }];
    this.updateData();
  }

  editQuestion(i, data) {
    this.questions[i] = data;
    this.updateData();
  }

  updateData() {
    this.dispatchEvent(
      new CustomEvent("data", {
        detail: {
          questions: this.questions
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
                  @data=${e => {
                    this.editQuestion(i, e.detail.data);
                  }}
                  @remove=${() => {
                    this.questions = this.questions.filter((_, j) => i !== j);
                  }}
                ></x-single>
              `;
            default:
              return html`
                <p>Form for ${question.type} not implemented yet</p>
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
