import Shape from "./Shape";

class Circle extends Shape {
  constructor(left, top) {
    super(left, top, `10px / 10px`);
  }

  getType() {
    return "circle";
  }

  toJson() {
    return {
      ...super.toJson(),
      type: "circle"
    }
  }
}

export default Circle;