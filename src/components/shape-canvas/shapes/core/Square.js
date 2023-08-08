import Shape from "./Shape";

class Square extends Shape {
  constructor(left, top) {
    super(left, top);
    this.borderRadius = "0px";
  }

  getShapeInfo() {
    return {
      ...super.getShapeInfo(),
      borderRadius: this.borderRadius
    }
  }

  toJson() {
    return {
      ...super.toJson(),
      type: "square"
    }
  }
}

export default Square;