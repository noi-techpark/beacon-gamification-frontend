import { css, LitElement, html } from "lit-element";
import { buttonStyle } from "../styles/button";
import { connect } from "pwa-helpers";
import { store } from "../createStore";

class Modal extends connect(store)(LitElement) {
  // constructor() {
  //   super();
  // }
  stateChanged(state) {
    console.log(state);
    this.show = state.showModal;
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
  static get properties() {
    return {
      show: { type: Boolean },
      showManage: { type: Function }
    };
  }
  render() {
    // console.log(connect(store));
    if (this.show) {
      return html`
        <div class="modal">
          <div class="modal_content">
            <button @click=${this.showManage}>❌</button>
            MODAL
          </div>
        </div>
      `;
    }
  }
}

customElements.define("x-modal", Modal);
