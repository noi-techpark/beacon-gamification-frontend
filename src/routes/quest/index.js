import { LitElement, html } from "lit-element";

class Quest extends LitElement {
  render() {
    return html`
      <div>
        QUESTS
      </div>
    `;
  }
}

customElements.define("x-route-quests", Quest);
