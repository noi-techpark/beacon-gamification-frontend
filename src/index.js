import { LitElement, html } from "lit-element";
import "./components/private-route";
import "./components/navbar";

import "../src/routes/login";
import "../src/routes/quest";

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
      <div>
        ${this.current_route !== "/login"
          ? html`
              <x-navbar></x-navbar>
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
      </div>
    `;
  }
}

customElements.define("x-root", Root);
