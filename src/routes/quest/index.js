import { LitElement, html } from "lit-element";

// Extend the LitElement base class
class Quest extends LitElement {
  render() {
    return html`
      <div>
        QUESTS
      </div>
    `;
  }
}
// Register the new element with the browser.
customElements.define("x-route-quests", Quest);
