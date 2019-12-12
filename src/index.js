import { LitElement, html, css } from "lit-element";
import "../src/routes/login";
import "../src/routes/quest/questRoute";
import "../src/routes/beacon/beaconRoute";
import "./components/modal";
import "./components/navbar";
import "./components/footer";
import "./components/private-route";

class Root extends LitElement {
  constructor() {
    super();
    this.current_route = "";
  }

  static get properties() {
    return {
      current_route: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        height: 100vh;
        flex-direction: column;
      }
      .content {
        flex: 1;
        overflow: scroll;
      }
    `;
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
      <div class="content">
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
      </div>
      <x-footer> </x-footer>
    `;
  }
}

customElements.define("x-root", Root);
