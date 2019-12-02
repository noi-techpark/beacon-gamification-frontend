import { html, LitElement } from "lit-element";

class SortableList extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
      renderElement: { type: Function },
      onOrderChange: { type: Function },
      css: { type: String }
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
                    draggable="true"
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
