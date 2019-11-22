import { LitElement, html } from "lit-element";
import "./questions/single";

class QuestionForm extends LitElement {
  constructor() {
    super();
    this.questions = this.questions ? this.questions : [];
  }

  static get properties() {
    return {
      //   data: { type: Object },
      onDataChange: { type: Function },
      questions: { type: Array }
    };
  }

  addQuestion() {
    const type = this.shadowRoot.querySelector("select").value;
    this.questions = [...this.questions, { type }];
    this.requestUpdate();
  }

  editQuestion(i, data) {
    this.questions[i] = data;
    this.requestUpdate();
  }

  render() {
    return html`
      <div>
        ${this.questions.map((question, i) => {
          switch (question.type) {
            case "single":
              return html`
                <x-single
                  data="${JSON.stringify(question)}"
                  @data=${e => this.editQuestion(i, e.detail.data)}
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

        <p>json generato:</p>
        <textarea rows="10" cols="70" name="properties">
        
      ${JSON.stringify(this.questions)}
        </textarea
        >
      </div>
    `;
  }
}

customElements.define("question-form", QuestionForm);
