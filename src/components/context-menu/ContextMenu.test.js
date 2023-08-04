import { fireEvent, render } from "@testing-library/react";
import ContextMenu from "./ContextMenu";

describe("ContextMenu 컴포넌트가 렌더된다.", () => {
  let getByTestId, element;

  beforeEach(() => {
    ({ getByTestId } = render(
      <ContextMenu>
        <div data-testid='test'></div>
      </ContextMenu>
    ))

    element = getByTestId("test");
  })

  test("우클릭시 UI가 보여진다.", () => {
    fireEvent.contextMenu(element);
    
    const contextMenu = getByTestId("context-menu");
    expect(contextMenu).toHaveStyleRule("display", "block");
  });

  test("우클릭한 위치에서 UI가 보여진다.", () => {
    fireEvent.contextMenu(element, { clientX: 100, clientY: 100 });

    const contextMenu = getByTestId("context-menu");
    expect(contextMenu).toHaveStyleRule("left", '100px');
    expect(contextMenu).toHaveStyleRule("top", "100px");
  })
  
  test("ContextMenu 컴포넌트가 보여진 상태에서 클릭시 UI가 사라진다.", () => {
    fireEvent.contextMenu(element);
    fireEvent.click(element);
  
    const contextMenu = getByTestId("context-menu");
    expect(contextMenu).toHaveStyleRule("display", "none");
  });

  test("ContextMenu 컴포넌트가 보여진 상태에서 우클릭시 UI가 사라진 후 다시 보여진다.", () => {
    fireEvent.contextMenu(element);

    const contextMenu = getByTestId("context-menu");
    expect(contextMenu).toHaveStyleRule("display", "block");

    fireEvent.contextMenu(element);
    expect(contextMenu).toHaveStyleRule("display", "none");

    setTimeout(() => {
      expect(contextMenu).toHaveStyleRule("display", "block");
    }, 100)
  });
});