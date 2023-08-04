import { fireEvent, render, screen } from "@testing-library/react";
import { Circle, Square } from '../shapes/core';

import Canvas from "./Canvas";

describe("Canvas 컴포넌트 마우스 이벤트(MouseDown, MouseMove, MouseUp)를 차례대로 실행시 정상 동작 하는가?", () => {
  let getByTestId, canvasDiv, tempDiv;

  beforeEach(() => {
    const shape = new Square();
    ({ getByTestId } = render(<Canvas shape={shape} />));
    canvasDiv = getByTestId("canvas");
    fireEvent.mouseDown(canvasDiv);

    tempDiv = Array.from(canvasDiv.childNodes).find(node => node.classList.contains("temp-div"));
    expect(tempDiv).toBeDefined();
  })

  test("MouseDown 이벤트 발생시 Canvas 컴포넌트 하위에 temp-div 클래스를 가진 div가 추가 되는가?", async () => {
    expect(tempDiv.getAttribute("class")).toBe("temp-div");
      
    // 도형을 표시하는 div 생성 후 div의 초기 크기 값 체크
    expect(tempDiv.style.width).toBe("5px");
    expect(tempDiv.style.height).toBe("5px");
  });
  
  test("MouseMove 이벤트 발생시 컴포넌트 하위에 temp-div 클래스를 가진 div의 사이즈가 변경 되는가?", async () => {
    // mouseDown 이벤트로 초기 좌표는 left: 0px, top: 0px 이다.
    // 마우스를 왼쪽으로 100px, 아래로 100px 움직인다.
    fireEvent.mouseMove(canvasDiv, { clientX: 100, clientY: 100 });
    
    expect(tempDiv.style.width).toBe("100px");
    expect(tempDiv.style.height).toBe("100px");
  });

  test("MouseUp 이벤트 발생시 컴포넌트 하위에 temp-div 클래스를 가진 div가 삭제되고 Shape 컴포넌트가 생성되는가?", async () => {
    // 마우스를 왼쪽으로 100px, 아래로 100px 움직인다.
    fireEvent.mouseMove(canvasDiv, { clientX: 100, clientY: 100 });

    fireEvent.mouseUp(canvasDiv);
    tempDiv = Array.from(canvasDiv.childNodes).find(node => node.classList.contains("temp-div"));
    expect(tempDiv).not.toBeDefined();
    
    const shape = screen.getByTestId("shape");
    expect(shape).toBeInTheDocument();
    expect(shape).toHaveStyleRule("width", "100px");
    expect(shape).toHaveStyleRule("height", "100px");
  })
})