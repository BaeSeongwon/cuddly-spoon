import { Square, Circle } from "./core";

class ShapeFactory {
  constructor() {
    if(!ShapeFactory.instance) {
      ShapeFactory.instance = this;
    }

    return ShapeFactory.instance;
  }

  createShape(type) {
    if(type) {
      if(type === "box") {
        return new Square();
      } else if(type === "circle") {
        return new Circle();
      }
    } else {
      return null;
    }
  }
}

export default ShapeFactory;