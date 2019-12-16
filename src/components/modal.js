import { css, html, LitElement } from "lit-element";
import { connect } from "pwa-helpers";
import { store } from "../createStore";
import { modalsReducerActionTypes } from "../reducers/modalsReducer";
import { buttonStyle } from "../styles/button";
import { formStyle } from "../styles/form";

class Modal extends connect(store)(LitElement) {
  static get properties() {
    return {
      modalId: { type: String },
      show: { type: Boolean },
      title: { type: String },
      contentFunction: { type: Function }
    };
  }

  constructor() {
    super();
    this.show = false;
    this.modalId = "";
  }

  static get styles() {
    return [
      buttonStyle,
      formStyle,
      css`
        .modal {
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 9;
          background: rgba(247, 248, 249, 0.75);
        }
        .modal_content {
          width: 400px;
          max-height: 80vh;
          position: absolute;
          top: 50%;
          left: 50%;
          background-color: white;
          transform: translate(-50%, -50%);
          min-height: 500px;
          box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
          padding: 16px;
          overflow: scroll;
        }
        .modal_content__header {
          display: flex;
          justify-content: space-between;
        }
        label {
          margin-top: 0.5rem;
          display: block;
        }
        .close_x {
          cursor: pointer;
        }
      `
    ];
  }

  handleCloseModal() {
    store.dispatch({ type: modalsReducerActionTypes.HIDE_MODAL });
  }

  render() {
    return html`
      ${this.show && this.modalId === this.currentModal
        ? html`
            <div class="modal">
              <div class="modal_content">
                <div class="modal_content__header">
                  ${this.title}
                  <span class="close_x" @click=${this.handleCloseModal}
                    >❌</span
                  >
                </div>
                <div class="modal_content__body">
                  ${this.contentFunction(store.getState())}
                </div>
                <div class="modal_content__footer"></div>
              </div>
            </div>
          `
        : null}
    `;
  }

  stateChanged({ modalsReducer }) {
    this.show = modalsReducer.showModal;
    this.currentModal = modalsReducer.currentModal;
  }
}

customElements.define("x-modal", Modal);
