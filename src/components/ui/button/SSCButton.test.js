import SSCButton from "./SSCButton";
import { fireEvent, render } from "@testing-library/react";

test("SSCButton 컴포넌트의 label 및 onClick props가 정상동작 한다.", () => {
  const handleClick = jest.fn();
  const { getByText } = render(<SSCButton label='Click Me' onClick={handleClick}/>);
  
  fireEvent.click(getByText('Click Me'));
  expect(handleClick).toBeCalledTimes(1);
})