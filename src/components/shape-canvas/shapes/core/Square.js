import Shape from "./Shape";

class Square extends Shape {
  constructor(left, top) {
    super(left, top, "0px");
  }

  getType() {
    return "square";
  }

  toJson() {
    return {
      ...super.toJson(),
      type: "square"
    }
  }
}

export default Square;