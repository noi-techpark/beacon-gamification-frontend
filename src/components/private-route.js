import { LitElement, html } from "lit-element";
import { API_CONFIG } from "../config";

class PrivateRoute extends LitElement {
  constructor() {
    super();
    this.isLogged = false;
  }

  static get properties() {
    return { isLogged: { type: Boolean } };
  }

  async connectedCallback() {
    super.connectedCallback();
    const token = localStorage.getItem("auth-token");
    if (token) {
      try {
        const request = await fetch(
          `${API_CONFIG.base_path}/check-token/?token=${token}`
        );
        await request.json();
        this.isLogged = true;
      } catch (e) {
        window.location = "/login";
      }
    } else {
      window.location = "/login";
    }
  }

  // TODO: verify if it works
  // shouldUpdate() {
  //   return this.isLogged;
  // }

  render() {
    return html`
      ${!this.isLogged ? null : this.children}
    `;
  }
}

customElements.define("private-route", PrivateRoute);
