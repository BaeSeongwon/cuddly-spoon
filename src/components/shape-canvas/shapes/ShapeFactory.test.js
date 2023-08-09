import ShapeFactory from "./ShapeFactory";
import { Circle, Square } from "./core";

describe("ShapeFactory 객체의 테스트", () => {
  let shapeFactory = null;

  beforeEach(() => {
    shapeFactory = new ShapeFactory();
  })
  
  test("createShape 함수를 호출하여 Circle 객체가 반환된다.", () => {
    const shape = shapeFactory.createShape("circle");
  
    expect(shape).toBeInstanceOf(Circle);
  })

  test("createShape 함수를 호출하여 Square 객체가 반환된다.", () => {
    const shape = shapeFactory.createShape("square");

    expect(shape).toBeInstanceOf(Square);
  })
})
