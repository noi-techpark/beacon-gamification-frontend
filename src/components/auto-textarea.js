import { LitElement, html, css } from "lit-element";

class AutoTextarea extends LitElement {
  static get properties() {
    return {
      value: { type: String },
      onInput: { type: Function },
      disabled: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      textarea {
        resize: none;
        overflow: hidden;
        min-height: 30px;
        width: 100%;
      }
    `;
  }

  setHeight() {
    const textArea = this.shadowRoot.querySelector("textarea");
    textArea.style.height = "5px"; // this is needed otherwise the element always increases height
    textArea.style.height = `${textArea.scrollHeight}px`;
  }

  handleInput(e) {
    this.onInput && this.onInput(e.target.value);
    this.setHeight();
  }

  render() {
    // fixes size after value change from outside
    setTimeout(() => {
      if (this.shadowRoot.querySelector("textarea")) {
        this.setHeight();
      }
    }, 0);

    return html`
      <textarea @input=${this.handleInput} .disabled=${this.disabled}>
${this.value}</textarea
      >
    `;
  }
}

customElements.define("auto-textarea", AutoTextarea);
