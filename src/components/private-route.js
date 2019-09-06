import { LitElement, html } from "lit-element";
import { API_CONFIG } from "../config";

// Extend the LitElement base class
class PrivateRoute extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {};
  }

  async firstUpdated() {
    const token = localStorage.getItem("auth-token");
    if (token) {
      try {
        const request = await fetch(
          `${API_CONFIG.base_path}/check-token/?token=${token}`
        );

        const results = await request.json();
        console.log(results);
      } catch (e) {
        console.log(e);
        // window.location = "/login";
      }
    } else {
      // window.location = "/login";
    }
  }

  render() {
    if (this.path !== window.location.pathname) {
      return null;
    }

    return html`
      <div>
        ${this.children}
      </div>
    `;
  }
}

customElements.define("private-route", PrivateRoute);
