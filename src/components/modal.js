import { css, LitElement, html } from "lit-element";
import { buttonStyle } from "../styles/button";
import { connect } from "pwa-helpers";
import { store } from "../createStore";
import { modalsReducerActionTypes } from "../reducers/modalsReducer";

class Modal extends connect(store)(LitElement) {
  static get properties() {
    return {
      show: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.show = false;
  }

  static get styles() {
    return [
      buttonStyle,
      css`
        .modal {
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 9;
        }
        .modal_content {
          width: 400px;
          position: absolute;
          top: 50%;
          left: 50%;
          background-color: white;
          transform: translate(-50%, -50%);
          min-height: 500px;
          box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
          padding: 16px;
        }
      `
    ];
  }

  handleCloseModal() {
    store.dispatch({ type: modalsReducerActionTypes.HIDE_MODAL });
  }

  render() {
    return html`
      ${this.show
        ? html`
            <div class="modal">
              <div class="modal_content">
                ${this.show}
                <button @click=${this.handleCloseModal}>❌</button>
                MODAL
              </div>
            </div>
          `
        : null}
    `;
  }

  stateChanged({ modalsReducer }) {
    this.show = modalsReducer.showModal;
  }
}

customElements.define("x-modal", Modal);
