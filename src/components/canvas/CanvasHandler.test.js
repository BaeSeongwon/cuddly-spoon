import CanvasHandler from "./CanvasHandler";
import { Circle } from "./shapes";

test("캔버스에 마우스 클릭시 도형(네모, 동그라미) Dom(.temp-div)이 생성된다.", () => {
  const canvasHandler = CanvasHandler();
  const mockShape = {
    getShapeInfo: jest.fn().mockReturnValue({
      width: '5px',
      height: '5px',
      border: '1px solid black',
      position: 'absolute',
      left: `10px`,
      top: `10px`,
      borderRadius: '0px'
    }) 
  }
  const element = canvasHandler.getElementDom(mockShape);
  expect(element).toBeInstanceOf(HTMLElement);
  expect(element).toHaveAttribute('class', 'temp-div');
})

test("캔버스에 마우스를 시작점(left: 10px) 부터 우측으로 100px 드래그하여 도형의 크기를 변경한다.", () => {
  const shape = new Circle(10, 10);
  const canvasHandler = CanvasHandler();
  canvasHandler.setDragState(true);
  
  const dom = canvasHandler.getElementDom(shape);
  document.body.appendChild(dom);
  canvasHandler.moveElementDom(100, 1);
  
  // 시작 지점 left 10px -> left 100px
  // 예상 width 값(100 - 10) 90px
  // 마우스 포인트 P 지점에서 G 지점까지 드래그시 도형의 width 값이 100 - 10 크기만큼 증가 해야함
  // ___________________________
  // |                         |
  // |   10      100           |
  // |    _______              |
  // |   P ->    | <- G        |
  // |   |       |             |
  // |    -------              |
  // |                         |
  // |                         |
  // ---------------------------
  expect(dom).toHaveStyle({width: "90px", left: "10px"});
})

test("캔버스에 마우스를 시작점(left: 100px) 부터 좌측으로 100px 드래그하여 도형의 크기를 변경한다.", () => {
  const shape = new Circle(100, 10);
  const canvasHandler = CanvasHandler();
  canvasHandler.setDragState(true);
  
  const dom = canvasHandler.getElementDom(shape);
  document.body.appendChild(dom);
  canvasHandler.moveElementDom(10, 1);
  
  // 시작 지점 left 100px -> left 10px
  // 예상 width 값(100 - 10) 90px
  // 예상 left 값 10px
  // ___________________________
  // |                         |
  // |   10      100           |
  // |    _______              |
  // |   |<-G    P <-          |
  // |   |       |             |
  // |    -------              |
  // |                         |
  // |                         |
  // ---------------------------
  expect(dom).toHaveStyle({width: "90px", left: '10px'});
})

test("캔버스에 마우스를 시작점(top: 100px) 부터 위로 90px 드래그하여 도형의 크기를 변경한다.", () => {
  const shape = new Circle(10, 100);
  const canvasHandler = CanvasHandler();
  canvasHandler.setDragState(true);

  const dom = canvasHandler.getElementDom(shape);
  document.body.appendChild(dom);
  canvasHandler.moveElementDom(10, 10);

  // 시작 지점 top 100px -> top 10px
  // 예상 height 값(100 - 10) 90px
  // 예상 top 값 10px
  // ___________________________
  // |                         |
  // |                         |
  // |    _______              |
  // |   |   G    | 10         |
  // |   |   ^    |            |
  // |   |   P    | 100        |
  // |    -------              |
  // |                         |
  // |                         |
  // ---------------------------
  expect(dom).toHaveStyle({height: "90px", top: "10px"});
})

test("캔버스에 마우스를 시작점(top: 10px) 부터 아래로 100px 드래그하여 도형의 크기를 변경한다.", () => {
  const shape = new Circle(10, 10);
  const canvasHandler = CanvasHandler();
  canvasHandler.setDragState(true);

  const dom = canvasHandler.getElementDom(shape);
  document.body.appendChild(dom);
  canvasHandler.moveElementDom(10, 100);

  // 시작 지점 top 10px -> top 100px
  // 예상 height 값(100 - 10) 90px
  // 예상 top 값 10px
  // ___________________________
  // |                         |
  // |                         |
  // |    _______              |
  // |   |   P    | 10         |
  // |   |   ˅    |            |
  // |   |   G    | 100        |
  // |    -------              |
  // |                         |
  // |                         |
  // ---------------------------
  expect(dom).toHaveStyle({height: "90px", top: "10px"});
})

test("도형을 나타내는 Dom을 삭제한다.", () => {
  const shape = new Circle(100, 10);
  const canvasHandler = CanvasHandler();

  const dom = canvasHandler.getElementDom(shape);
  document.body.appendChild(dom);
  canvasHandler.removeElementDom();

  expect(dom).toHaveClass('temp-div');
})