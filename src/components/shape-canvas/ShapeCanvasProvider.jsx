import { useState, useEffect, createContext } from "react";
import { LocalStorage } from "../../utils/web-storage";
import { Square, Circle } from "./shapes/core";
import { STORAGE_SAVE_KEY, DEFAULT_SELECTED_SHAPE } from "./config";

/**
 * Shape Canvas 컴포넌트의 Context API
 * @property {string} selectedShapeType 캔버스에 그려질 도형
 * @default "square"
 * @property {array} drawnShapeList 캔버스에 그려진 도형 객체 배열
 * @default []
 * @property {string | null} selectedShapeId 캔버스에 그려진 도형의 컨텍스트 메뉴 호출시 선택된 도형의 아이디
 * @default null
 * @property {object | null} canvasBoundary 캔버스 테두리의 좌표값
 * @default null
 * @example {left: '10px', right: '10px', top: '10px', bottom: '10px'}
 * @property {function} setSelectedShapeType selectedShapeType의 setter 함수
 * @returns void
 * @property {function} setDrawnShapeList drawnShapeList의 setter 함수
 * @returns void
 * @property {function} setSelectedShapeId selectedShapeId의 setter 함수
 * @returns void
 * @property {function} setCanvasBoundary canvasBoundary의 setter 함수
 * @returns void
 * @property {function} onClearDrawnShapeList 캔버스에 그려진 모든 도형 삭제 함수
 * @returns void
 * @property {function} getMostTopZindexAndUpdate 캔버스에 그려진 도형의 z-index 중 가장 큰 값에 1증가한 값을 state에 저장 및 조회하는 함수
 * @returns number
 * @property {function} getMostTopZindex 캔버스에 그려진 도형의 z-index 중 가장 큰 값에 1증가한 값을 조회하는 함수
 * @return number
 * @property {function} onChangeShapeOrderTop 맨 앞으로 보내기 함수
 * @return void
 * @property {function} onChangeShapeOrderTop 맨 뒤로 보내기 함수
 */
export const ShapeCanvasContext = createContext({
  selectedShapeType: DEFAULT_SELECTED_SHAPE,
  setSelectedShapeType: () => {},
  drawnShapeList: [],
  setDrawnShapeList: () => {},
  onClearDrawnShapeList: () => {},
  selectedShapeId: null,
  setSelectedShapeId: () => {},
  canvasBoundary: null,
  setCanvasBoundary: () => {},
  getMostTopZindexAndUpdate: () => {},
  getMostTopZindex: () => {},
  onChangeShapeOrderTop: () => {}, 
  onChangeShapeOrderBottom: () => {}
});

export default function ShapeCanvasProvider({children}) {
  const [ selectedShapeType, setSelectedShapeType ] = useState(DEFAULT_SELECTED_SHAPE);
  const [ drawnShapeList, _setDrawnShapeList ] = useState([]);
  const [ selectedShapeId, setSelectedShapeId ] = useState(null);
  const [ shapeZindex, setShapeZindex ] = useState(1);
  const [ canvasBoundary, setCanvasBoundary ] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  });

  useEffect(() => {
    const savedData = LocalStorage.get(STORAGE_SAVE_KEY, true);

    if(savedData) {
      setDrawnShapeList(savedData.map((item) => {
        let shape = null;
        if(item.type === "square") {
          shape = new Square();
          shape.setShapeInfo(item.width, item.height, item.border, item.position, item.left, item.top, item.borderRadius, item.zIndex);
        } else if(item.type === "circle") {
          shape = new Circle();
          shape.setShapeInfo(item.width, item.height, item.border, item.position, item.left, item.top, item.borderRadius, item.zIndex);
        }

        return shape;
      }));
    }
  }, []);

  useEffect(() => {
    if(drawnShapeList.length > 0) {
      const findMostTopZindexValue = drawnShapeList.reduce((acc, shape) => {
        if(shape.getZindex() > acc) {
          acc = shape.getZindex();
        }

        return acc;
      }, 0);

      if(findMostTopZindexValue > 0) {
        setShapeZindex(findMostTopZindexValue + 1);
      }
    }
  }, [drawnShapeList])

  /**
   * @function 그려진 도형 전부 삭제 함수
   */
  const onClearDrawnShapeList = () => {
    LocalStorage.remove(STORAGE_SAVE_KEY);
    _setDrawnShapeList([]);
    setShapeZindex(0);
  }

  /**
   * @function z-index 제일 높은 값 가져오는 함수
   * @return number 
   */
  const getMostTopZindexAndUpdate = () => {
    setShapeZindex(shapeZindex + 1);

    return shapeZindex;
  }

  const setDrawnShapeList = (shapeList) => {
    if(shapeList) {
      const shapeJsonList = shapeList.map(item => item.toJson());
      LocalStorage.set(STORAGE_SAVE_KEY, shapeJsonList);

      _setDrawnShapeList(shapeList);
    }
  }

  const getMostTopZindex = () => {
    return shapeZindex + 1;
  }

  const onChangeShapeOrderTop = (id) => {
    if(id) {
      const findMostTopZindex = drawnShapeList.reduce((acc, shape) => {
        if(shape.getZindex() > acc) {
          acc = shape.getZindex();
        }

        return acc;
      }, 0);

      _setDrawnShapeList(drawnShapeList.map(shape => {
        if(shape.getId() === id) {
          shape.setZindex(findMostTopZindex);
        } else {
          const modifyZindex = shape.getZindex() - 1;
          shape.setZindex(modifyZindex);
        }

        return shape;
      }));
    }
  }

  const onChangeShapeOrderBottom = (id) => {
    if(id) {
      const findMostBottomZindex = drawnShapeList.reduce((acc, shape) => {
        if(shape.getZindex() < acc) {
          acc = shape.getZindex();
        }

        return acc;
      }, 0);

      _setDrawnShapeList(drawnShapeList.map(shape => {
        if(shape.getId() === id) {
          shape.setZindex(findMostBottomZindex);
        } else {
          const modifyZindex = shape.getZindex() + 1;
          shape.setZindex(modifyZindex);
        }

        return shape;
      }));
    }
  }

  return (
    <ShapeCanvasContext.Provider 
      value={{
        selectedShapeType, 
        setSelectedShapeType,
        drawnShapeList,
        setDrawnShapeList,
        onClearDrawnShapeList,
        selectedShapeId,
        setSelectedShapeId,
        canvasBoundary,
        setCanvasBoundary,
        getMostTopZindexAndUpdate,
        getMostTopZindex,
        onChangeShapeOrderTop,
        onChangeShapeOrderBottom
      }}
    >
      {children}
    </ShapeCanvasContext.Provider>
  )
}