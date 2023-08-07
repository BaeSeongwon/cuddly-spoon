import { useState, createContext } from "react";

export const ShapeCanvasContext = createContext({
  selectedShapeType: "box",
  setSelectedShapeType: () => {},
  drawnShapeList: [],
  setDrawnShapeList: () => {},
  onClearDrawnShapeList: () => {},
  selectedShapeId: null,
  setSelectedShapeId: () => {},
  canvasBoundary: null,
  setCanvasBoundary: () => {},
  getShapeZindex: () => {}
});

export default function ShapeCanvasProvider({children}) {
  const [ selectedShapeType, setSelectedShapeType ] = useState("box");
  const [ drawnShapeList, setDrawnShapeList ] = useState([]);
  const [ selectedShapeId, setSelectedShapeId ] = useState(null);
  const [ shapeZindex, setShapeZindex ] = useState(0);
  const [ canvasBoundary, setCanvasBoundary ] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  })

  const onClearDrawnShapeList = () => {
    setDrawnShapeList([]);
  }

  const getShapeZindex = () => {
    setShapeZindex(shapeZindex + 1);

    return shapeZindex;
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
        getShapeZindex
      }}
    >
      {children}
    </ShapeCanvasContext.Provider>
  )
}