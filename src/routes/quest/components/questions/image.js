import { html, css } from "lit-element";
import BaseQuestion from "./base";
import "./inline-answer";
import { API_CONFIG } from "../../../../config";
import { handleEvent } from "../../../../utils/components_utils";

class ImageSelection extends BaseQuestion {
  constructor() {
    super();
    this.title = "Image selection";
    this.handleEvent = handleEvent;
  }

  async addAnswer() {
    const image_path = await this.waitForImage();
    this.data.options.push(image_path);
    this.updateData();
  }

  async waitForImage() {
    this.shadowRoot.querySelector("#imageInput").click();
    return new Promise((resolve, reject) => {
      this.imagePromise = { resolve, reject };
    });
  }

  async inputChange(e) {
    const path = await this.uploadImage(e.target.files[0]);
    this.imagePromise.resolve(path);
  }

  async uploadImage(image) {
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await fetch(`${API_CONFIG.base_path}/upload-image/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Token ${localStorage.getItem("auth-token")}`
        }
      });
      const json = await response.json();
      return json.public_url;
    } catch (e) {
      this.imagePromise.reject(e);
    }
  }

  static get styles() {
    return [
      super.styles,
      css`
        img {
          max-height: 100px;
          width: auto;
          max-width: 300px;
        }
      `
    ];
  }

  async editAtPosition(i) {
    const image_path = await this.waitForImage();
    this.data.options[i] = image_path;
    this.updateData();
  }

  renderAnswers() {
    return html`
      <div class="answers">
        <label>Answers </label>

        <input
          id="imageInput"
          type="file"
          accept="image/*"
          @change=${this.inputChange}
          style="display: none"
        />

        ${this.data.options.map(
          (option, i) => html`
            <inline-answer
              value=${option}
              ?selected=${option === this.data.answer}
              @data=${e => {
                const newValue = e.detail.value;
                if (option === this.data.answer) {
                  this.data.answer = newValue;
                }
                this.data.options[i] = newValue;
                this.updateData();
              }}
              @selectAnswer=${e => {
                const selected = e.detail.value;
                this.data.answer = selected;
                this.updateData();
              }}
              @deleteOption=${() => this.removeOptionAt(i)}
            >
              <div slot="content">
                <img src=${option} alt=${option.split("/").slice(-1)[0]} />
              </div>
              <div slot="actions">
                <a
                  href="javascript:;"
                  @click=${() => this.editAtPosition(i)}
                  >edit
                </a>
              </div>
            </div>
            </inline-answer>
          `
        )}
        ${this.renderAddOptioButton()}
      </div>
    `;
  }
}

customElements.define("x-image", ImageSelection);
