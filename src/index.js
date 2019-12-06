import { html, LitElement } from "lit-element";
import "../src/routes/login";
import "../src/routes/quest/questRoute";
import "../src/routes/beacon/beaconRoute";
import "./components/modal";
import "./components/navbar";
import "./components/private-route";

class Root extends LitElement {
  static get properties() {
    return {
      current_route: { type: String }
    };
  }
  constructor() {
    super();
    this.current_route = "";
  }

  firstUpdated() {
    this.current_route = window.location.pathname;
  }

  render() {
    return html`
      ${this.current_route !== "/login"
        ? html`
            <x-navbar></x-navbar>
          `
        : null}
      ${this.current_route === "/"
        ? html`
            <h2 style="margin-left: 2rem;">
              Hi, welcome to the quest creator.
            </h2>
          `
        : null}
      ${this.current_route === "/login"
        ? html`
            <x-route-login></x-route-login>
          `
        : null}
      ${this.current_route === "/quests"
        ? html`
            <private-route><x-route-quests></x-route-quests></private-route>
          `
        : null}
      ${this.current_route === "/beacons"
        ? html`
            <private-route><x-route-beacon></x-route-beacon></private-route>
          `
        : null}
    `;
  }
}

customElements.define("x-root", Root);
