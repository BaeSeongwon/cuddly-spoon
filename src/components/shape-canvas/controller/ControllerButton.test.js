import { screen, render, fireEvent } from "@testing-library/react";
import ControllerButton from "./ControllerButton";

test("컴포넌트가 렌더가 되는지 테스트", () => {
  render(<ControllerButton/>);

  const defaultLabelButton = screen.getByText('controller');
  expect(defaultLabelButton).toBeInTheDocument();
})

test("컴포넌트의 props.label 설정이 되는지 테스트", () => {
  render(<ControllerButton label="Box"/>)

  const component = screen.getByText("Box");
  expect(component).toBeInTheDocument();
})

test("컴포넌트의 props.active가 true일때 버튼의 라벨에 font-weight 속성이 bold인지 테스트", () => {
  render(<ControllerButton label="Circle" active={true}/>)

  const component = screen.getByText("Circle");
  expect(component).toHaveStyle("font-weight: bold");
})

test("컴포넌트의 클릭 이벤트 동작 테스트", () => {
  const handleClick = jest.fn();
  render(<ControllerButton label="Circle" onClick={handleClick}/>);

  const component = screen.getByText("Circle");
  fireEvent.click(component);
  expect(handleClick).toBeCalledTimes(1);
})
