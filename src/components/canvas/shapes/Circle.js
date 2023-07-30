import Shape from "./Shape";

class Circle extends Shape {
  constructor(left, top) {
    super(left, top);
    this.borderRadius = '10px';
  }

  getShapeInfo() {
    return {
      ...super.getShapeInfo(),
      borderRadius: this.borderRadius
    }
  }

  updateShapeSize(left, top) {
    super.updateShapeSize(left, top);
    this.borderRadius = `${this.width} / ${this.height}`;
  }
}

export default Circle;