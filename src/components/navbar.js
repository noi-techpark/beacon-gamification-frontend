import { LitElement, html, css } from "lit-element";

class Navbar extends LitElement {
  static get styles() {
    return css`
      .navbar {
        height: 60px;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        font-weight: 500;
        justify-content: space-between;
        z-index: 1000;
        padding: 0 16px;
      }
      .logo {
        margin: 0 8px;
      }
      .elements a {
        margin: 0 8px;
      }
    `;
  }

  handleLogout(e) {
    e.preventDefault();
    localStorage.setItem("auth-token", "");
    localStorage.setItem("user", "");
    window.location = "/login";
  }

  render() {
    return html`
      <div class="navbar">
        <div class="logo">
          QuestBuilder
        </div>
        <div class="elements">
          <a href="/quests">Quests</a>
          <a href="" @click=${this.handleLogout}>Logout</a>
        </div>
      </div>
    `;
  }
}

customElements.define("x-navbar", Navbar);
