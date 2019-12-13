import { LitElement, html, css } from "lit-element";

class Footer extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: space-around;
        box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
      }

      :host > div > p:first-child {
        font-weight: bold;
      }

      :host > div > p {
        margin: 10px;
      }

      :host > div {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }

      a {
        text-decoration: none;
        color: black;
      }
      a:hover {
        text-decoration: underline;
        color: black;
      }
    `;
  }

  render() {
    return html`
      <div>
        <p>Beacon Südtirol - Alto Adige</p>
        <p><a href="mailto:info@beacon.bz.it">info@beacon.bz.it</a></p>
        <p><a href="//beacon.bz.it">beacon.bz.it</a></p>
      </div>
      <div>
        <p>NOI Techpark Südtirol / Alto Adige</p>
        <p>A. Volta-Straße, 13A</p>
        <p>Via A. Volta, 13A</p>
        <p>I-39100 Bozen / Bolzano</p>
        <p><a href="mailto:info@noi.bz.it">info@noi.bz.it</a></p>
        <p><a href="//www.noi.bz.it">www.noi.bz.it</a></p>
      </div>
    `;
  }
}

customElements.define("x-footer", Footer);
