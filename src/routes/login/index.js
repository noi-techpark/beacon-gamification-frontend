import { LitElement, html } from "lit-element";
import { API_CONFIG } from "../../config";

// Extend the LitElement base class
class Login extends LitElement {
  async handleSubmit(e) {
    e.preventDefault();
    const username = this.shadowRoot.getElementById("form-username").value;
    const password = this.shadowRoot.getElementById("form-password").value;
    if (username && password) {
      fetch(`${API_CONFIG.base_path}/api-token-auth/`, {
        method: "POST",
        body: JSON.stringify({ username, password })
      });
    } else {
      alert("Complete the form!");
    }
  }

  render() {
    return html`
      <div>
        <form @submit=${this.handleSubmit}>
          <input id="form-username" type="text" name="username" />
          <input id="form-password" type="password" name="password" />
          <button type="submit">Submit</button>
        </form>
      </div>
    `;
  }
}
// Register the new element with the browser.
customElements.define("x-route-login", Login);
