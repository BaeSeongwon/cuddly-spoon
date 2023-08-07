import { fireEvent, render } from "@testing-library/react";
import ShapeCanvasProvider from "../ShapeCanvasProvider";
import Controller from "./Controller";

describe("Controller 컴포넌트의 버튼(Box, Circle, Clear)의 기능이 정상 동작 하는가?", () => {
  let getByText;
  
  beforeEach(() => {
    ({ getByText } = render(
      <ShapeCanvasProvider>
        <Controller />
      </ShapeCanvasProvider>
    ));
  })
  
  test("Box 버튼을 클릭하면 버튼 라벨 글씨가 bold 상태로 변경된다.", () => {
    let boxButton = getByText("Box");
  
    fireEvent.click(boxButton);
    expect(boxButton).toHaveStyle("font-weight: bold");
  })
  
  test("Circle 버튼을 클릭하면 버튼 라벨 글씨가 bold 상태로 변경된다.", () => {
    let circleButton = getByText("Circle");
  
    fireEvent.click(circleButton);
    expect(circleButton).toHaveStyle("font-weight: bold");
  })
})