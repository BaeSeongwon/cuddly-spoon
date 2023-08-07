import { fireEvent, render } from "@testing-library/react";
import Shape from "./Shape";

test("MouseDown 이벤트 발생시 이벤트 버블링을 차단한다.", () => {
  const mockMouseDown = jest.fn();
  const { getByTestId } = render(<div onMouseDown={mockMouseDown}><Shape /></div>);

  const element = getByTestId('shape');
  fireEvent.mouseDown(element);

  expect(mockMouseDown).not.toHaveBeenCalled();
});

test("MouseMove 이벤트 발생시 Shape 컴포넌트의 left, top 값이 변경된다.", () => {
  const { getByTestId } = render(<Shape />);

  
})