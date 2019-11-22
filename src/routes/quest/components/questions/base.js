import { LitElement, html, css } from "lit-element";

export default class BaseQuestion extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    if (!this.data) this.data = {};
    if (!this.data.options) this.data.options = [];
  }

  static get properties() {
    return {
      title: { type: String },
      data: { type: Object }
    };
  }

  static get styles() {
    return css`
      .questionForm {
        border: 1px solid gray;
        padding: 5px;
      }
      .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .header * {
        margin: 0px;
        display: inline-block;
      }
    `;
  }

  updateData() {
    this.dispatchEvent(
      new CustomEvent("data", {
        detail: {
          data: this.data
        }
      })
    );
    this.requestUpdate();
  }

  handleRemove() {
    this.dispatchEvent(new CustomEvent("remove", { detail: { boh: "ok" } }));
  }

  render() {
    return html`
      <div class="questionForm">
        <div class="header">
          <h3>${this.title}</h3>
          <span @click=${this.handleRemove}>❌</span>
        </div>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("x-base-question", BaseQuestion);
