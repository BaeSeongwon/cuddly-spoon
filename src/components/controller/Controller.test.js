import { fireEvent, render } from "@testing-library/react";
import Controller from "./Controller";

test("Box 버튼을 클릭하면 버튼 라벨 글씨 굵기가 굵어지고 onChangeShape 함수 매개변수에 'box' 값이 전달된다.", () => {
  let shape = null;
  let { getByText } = render(<Controller onChangeShape={(selectedShape) => { shape = selectedShape }} />)
  let boxButton = getByText("Box");

  fireEvent.click(boxButton);

  expect(shape).toBe("box");
  expect(boxButton).toHaveStyle("font-weight: bold");
});

test("Circle 버튼을 클릭하면 버튼 라벨 글씨 굵기가 굵어지고 onChangeShape 함수 매개변수에 'circle' 값이 전달된다.", () => {
  let shape = null;
  let { getByText } = render(<Controller onChangeShape={(selectedShape) => { shape = selectedShape }} />)
  let circleButton = getByText("Circle");

  fireEvent.click(circleButton);

  expect(shape).toBe("circle");
  expect(circleButton).toHaveStyle("font-weight: bold");
});

test("Clear 버튼을 클릭하면 onClearCanvas 함수가 실행된다.", () => {
  const handleClearCanvas = jest.fn();
  let { getByText } = render(<Controller onClearCanvas={handleClearCanvas}  />)
  let clearButton = getByText("Clear");

  fireEvent.click(clearButton);

  expect(handleClearCanvas).toHaveBeenCalledTimes(1);
})