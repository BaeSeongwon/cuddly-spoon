class ShapeDomManager {
  #element = null;

  constructor(shape) {
    if(shape) {
      const { width, height, border, borderRadius, position, left, top } = shape.getShapeInfo();

      this.#element = document.createElement("div");
      this.#element.setAttribute('class', 'temp-div');
      this.#element.style.width = width;
      this.#element.style.height = height;
      this.#element.style.border = border;
      this.#element.style.borderRadius = borderRadius;
      this.#element.style.position = position;
      this.#element.style.left = left;
      this.#element.style.top = top;
    }
  }

  getElement() {
    if(this.#element) {
      return this.#element;
    } else {
      return null;
    }
  }

  updateElementSize(width, height, left, top, borderRadius) {
    if(this.#element) {
      this.#element.style.width = width;
      this.#element.style.height = height;
      this.#element.style.left = left;
      this.#element.style.top = top;
      //this.#element.style.borderRadius = borderRadius;
    }
  }

  removeElement() {
    const element = document.querySelector(".temp-div");

    if(element) {
      element.remove();
      this.#element = null;
    }
  }
}

export default ShapeDomManager;