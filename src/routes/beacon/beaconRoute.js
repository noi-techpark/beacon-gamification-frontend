import { html, LitElement, css } from "lit-element";
import { connect } from "pwa-helpers";
import { getBeaconListAction } from "../../actions/beaconsActions";
import { store } from "../../createStore";
import { buttonStyle } from "../../styles/button";
import { questStyle } from "../quest/questStyle";
import { MODAL_IDS } from "../../utils/modals_ids";
import { createBeaconForm } from "./components/createBeaconForm";
import { showModalAction } from "../../actions/modalsActions";

class BeaconRoute extends connect(store)(LitElement) {
  constructor() {
    super();
    this.beaconListResults = [];
    this.beaconList = {};
    this.createBeaconForm = createBeaconForm.bind(this);
  }

  static get styles() {
    return [
      buttonStyle,
      questStyle,
      css`
        .beacon__list {
          /* padding-top: 0.5rem; */
          width: 50%;
          margin: 0 auto;
        }

        .beacon__list__element {
          margin: 1rem 0;
        }
        .beacon__list__element p {
          padding: 0 0.5rem;
        }
        .beacon__list__element p span {
          display: inline-flex;
          border: 1px solid #eaeaea;
          height: 30px;
          align-items: center;
          padding: 0 0.5rem;
        }
        .pagination__container {
          display: flex;
          align-items: center;
          justify-content: center;
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
              <p>${o.name} <span>${o.beacon_id}</span></p>
              <hr />
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
    `;
  }
}

customElements.define("x-route-beacon", BeaconRoute);
