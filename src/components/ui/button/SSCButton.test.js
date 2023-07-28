import SSCButton from "./SSCButton";
import { fireEvent, render } from "@testing-library/react";

test("should work as expected with defaultProps", () => {
  const button = render(<SSCButton />);
  expect(button.container).toMatchInlineSnapshot(`
    <div>
      <div>
        <button>
          Button
        </button>
      </div>
    </div>
  `);
})

test("should simulate button click", () => {
  const handleClick = jest.fn();
  const { getByText } = render(<SSCButton label='Click Me' onClick={handleClick}/>);
  
  fireEvent.click(getByText('Click Me'));
  expect(handleClick).toBeCalledTimes(1);
})