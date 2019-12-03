import { html, LitElement } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";

class SortableList extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
      renderElement: { type: Function },
      onOrderChange: { type: Function },
      css: { type: String },
      defaultDraggable: { type: Boolean }
    };
  }

  onDragStart(e, element) {
    this.dragged = element;
  }

  onDragEnter(e, element) {
    if (this.dragged === element) {
      return false;
    }
    const oldIndex = this.data.indexOf(this.dragged);
    const newIndex = this.data.indexOf(element);
    this.data.splice(oldIndex, 1);
    this.data.splice(newIndex, 0, this.dragged);

    this.requestUpdate();
  }

  onDragEnd() {
    this.dragged = undefined;
    this.onOrderChange(this.data);
  }

  onDragOver(e) {
    // disables "going back" animation
    e.preventDefault();
  }

  render() {
    return html`
      <style>
        ${this.css}
      </style>
      ${this.renderElement && this.data
        ? this.data
            // .sort((a, b) => a.quest_index - b.quest_index)
            .map(
              el =>
                html`
                  <div
                    @dragstart=${e => this.onDragStart(e, el)}
                    @dragenter=${e => this.onDragEnter(e, el)}
                    @dragend=${() => this.onDragEnd()}
                    @dragover=${this.onDragOver}
                    draggable="${ifDefined(
                      this.defaultDraggable !== false ? "true" : undefined
                    )}"
                  >
                    ${this.renderElement(el)}
                  </div>
                `
            )
        : null}
    `;
  }
}

customElements.define("x-sortable-list", SortableList);
