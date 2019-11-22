import { LitElement, html, css } from "lit-element";

export default class InlineAnswer extends LitElement {
  static get properties() {
    return {
      value: { type: String },
      selected: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      :host > * {
        padding: 2px 5px;
      }
      :host * {
        box-model: border-box;
      }
      :host {
        display: flex;
        flex-direction: row;
        border: 1px solid black;
      }
      .select {
        min-width: 20px;
        border-right: 1px solid black;
      }
      .content {
        flex: 1;
        padding: 0px 0px;
      }
      .defaultInput {
        width: calc(100% - 4px);
        height: calc(100% - 6px);
      }
    `;
  }

  onInput(e) {
    this.dispatchEvent(
      new CustomEvent("data", { detail: { value: e.target.value } })
    );
  }

  onSelect(e) {
    this.dispatchEvent(
      new CustomEvent("selectAnswer", { detail: { value: this.value } })
    );
  }

  render() {
    return html`
      <div class="select">
        <slot name="select">
          ${this.selected
            ? html`
                <input type="radio" checked="true" } />
              `
            : html`
                <input type="radio" @input=${this.onSelect} />
              `}
        </slot>
      </div>
      <div class="content">
        <slot name="content">
          <input
            type="text"
            value="${this.value}"
            class="defaultInput"
            @input=${this.onInput}
          />
        </slot>
      </div>
      <div>
        <slot name="actions"></slot>
        <!-- a href="javascript:;">edit </a-->
        <a href="javascript:;">delete </a>
      </div>
    `;
  }
}

customElements.define("inline-answer", InlineAnswer);
