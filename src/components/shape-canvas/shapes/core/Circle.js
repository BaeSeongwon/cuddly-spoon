import Shape from "./Shape";

class Circle extends Shape {
  #borderRadius;
  constructor(left, top) {
    super(left, top);
    this.#borderRadius = `10px / 10px`
  }

  init(left, top, zIndex) {
    super.init(left, top, zIndex);
  }

  getShapeInfo() {
    return {
      ...super.getShapeInfo(),
      borderRadius: this.#borderRadius
    }
  }

  toJson() {
    return {
      ...super.toJson(),
      type: "circle"
    }
  }
}

export default Circle;