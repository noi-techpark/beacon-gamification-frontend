export function handleEvent(name, value) {
  this.dispatchEvent(new CustomEvent(name, { detail: { value } }));
}
