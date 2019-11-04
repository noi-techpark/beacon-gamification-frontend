import { LitElement, html, css } from "lit-element";
import { API_CONFIG } from "../../config";
import { formStyle } from "../../styles/form";
import { buttonStyle } from "../../styles/button";

// Extend the LitElement base class
class Login extends LitElement {
  static get styles() {
    return [
      formStyle,
      buttonStyle,
      css`
        .login {
          width: 300px;
          margin: 0 auto;
        }
        button {
          margin-top: 0.5rem;
          width: 100%;
        }
      `
    ];
  }

  async handleSubmit(e) {
    e.preventDefault();
    const username = this.shadowRoot.getElementById("form-username").value;
    const password = this.shadowRoot.getElementById("form-password").value;
    if (username && password) {
      try {
        const response = await fetch(
          `${API_CONFIG.base_path}/api-token-auth/`,
          {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        const results = await response.json();
        localStorage.setItem("auth-token", results.token);
        localStorage.setItem("user", results.username);
        if (results.groups) {
          const isDesigner = results.groups.some(o => {
            return o.name === "designers";
          });
          if (isDesigner) {
            window.location = "/quests";
          } else {
            alert("Invalid permissions");
          }
        }
      } catch (e) {
        alert("Wrong credentials");
      }
    } else {
      alert("Complete the form!");
    }
  }

  render() {
    return html`
      <div class="login">
        <form @submit=${this.handleSubmit}>
          <label htmlFor="form-username">Username</label>
          <input id="form-username" type="text" name="username" />
          <label htmlFor="form-password">Password</label>
          <input id="form-password" type="password" name="password" />
          <button type="submit">LOGIN</button>
        </form>
      </div>
    `;
  }
}
// Register the new element with the browser.
customElements.define("x-route-login", Login);
