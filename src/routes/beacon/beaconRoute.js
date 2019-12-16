import { css, html, LitElement } from "lit-element";
import { connect } from "pwa-helpers";
import {
  deleteBeaconAction,
  getBeaconListAction,
  selectBeaconAction
} from "../../actions/beaconsActions";
import { showModalAction } from "../../actions/modalsActions";
import { store } from "../../createStore";
import { buttonStyle } from "../../styles/button";
import { MODAL_IDS } from "../../utils/modals_ids";
import { questStyle } from "../quest/questStyle";
import { createBeaconForm } from "./components/createBeaconForm";
import { editBeaconForm } from "./components/editBeaconForm";

class BeaconRoute extends connect(store)(LitElement) {
  constructor() {
    super();
    this.beaconListResults = [];
    this.beaconList = {};
    this.createBeaconForm = createBeaconForm.bind(this);
    this.editBeaconForm = editBeaconForm.bind(this);
  }

  static get styles() {
    return [
      buttonStyle,
      questStyle,
      css`
        .beacon__list {
          width: 1024px;
          margin: 0 auto 3rem auto;
        }

        .beacon__list__element {
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(50, 50, 93, 0.11);
          border-radius: 4px;
          margin-top: 0.5rem;
        }
        .beacon__list__element p {
          padding: 0 0.5rem;
        }
        .beacon__list__element p span {
          font-weight: bold;
        }
        .pagination__container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2rem;
        }
        .pagination__container p {
          cursor: pointer;
          text-decoration: underline;
        }
        .pagination__container p:hover {
          color: #5755d9;
        }
      `
    ];
  }

  static get properties() {
    return {
      beaconList: { type: Object },
      beaconListResults: { type: Array }
    };
  }

  stateChanged({ beaconsReducer }) {
    if (beaconsReducer.beaconList.results) {
      this.beaconList = { ...beaconsReducer.beaconList };
      this.beaconListResults = [...beaconsReducer.beaconList.results];
    }
  }

  async firstUpdated() {
    store.dispatch(getBeaconListAction());
  }

  manageShowBeaconModals(id) {
    store.dispatch(showModalAction(id));
  }

  render() {
    return html`
      <div class="beacon__list">
        <button
          class="full_width"
          @click=${() => {
            this.manageShowBeaconModals(MODAL_IDS.createBeacon);
          }}
        >
          ➕ Add beacon
        </button>
        ${this.beaconListResults.map(o => {
          return html`
            <div class="beacon__list__element">
              <p>
                <span>Name</span>: ${o.name} <span>ID</span>: ${o.beacon_id}
              </p>
              <div>
                <button
                  @click=${() => {
                    store.dispatch(selectBeaconAction(o.id));
                    this.manageShowBeaconModals(MODAL_IDS.editBeacon);
                  }}
                >
                  ✏️
                </button>
                <button
                  @click=${() => {
                    const result = confirm("Want to delete?");
                    if (result) {
                      store.dispatch(deleteBeaconAction(o.id));
                    }
                  }}
                >
                  ❌
                </button>
              </div>
            </div>
          `;
        })}
        <div class="pagination__container">
          ${this.beaconList.previous
            ? html`
                <p
                  @click=${() => {
                    store.dispatch(
                      getBeaconListAction(
                        this.beaconList.previous.split("?")[1]
                      )
                    );
                  }}
                >
                  Prev
                </p>
              `
            : null}
          ${this.beaconList.next
            ? html`
                <p
                  @click=${() => {
                    store.dispatch(
                      getBeaconListAction(this.beaconList.next.split("?")[1])
                    );
                  }}
                >
                  Next
                </p>
              `
            : null}
        </div>
      </div>
      <x-modal
        modalId=${MODAL_IDS.createBeacon}
        title="Add a beacon"
        .contentFunction=${this.createBeaconForm}
      >
      </x-modal>

      <x-modal
        modalId=${MODAL_IDS.editBeacon}
        title="Edit beacon"
        .contentFunction=${this.editBeaconForm}
      >
      </x-modal>
    `;
  }
}

customElements.define("x-route-beacon", BeaconRoute);
