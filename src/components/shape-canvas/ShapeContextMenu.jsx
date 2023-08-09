import { useContext } from "react";
import { ShapeCanvasContext } from "./ShapeCanvasProvider";

import ContextMenu from "../context-menu/ContextMenu";

function ShapeContextMenu({children}) {
  const { 
    drawnShapeList, 
    setDrawnShapeList, 
    selectedShapeId,
    onChangeShapeOrderTop,
    onChangeShapeOrderBottom
  } = useContext(ShapeCanvasContext);

  const handleDeleteShape = (e) => {
    e.stopPropagation();
    if(selectedShapeId) {
      setDrawnShapeList(drawnShapeList.filter((shape) => shape.getId() !== selectedShapeId));
    }
  }

  const handleChangeShapeOrderTop = (e) => {
    e.stopPropagation();
    if(selectedShapeId) {
      onChangeShapeOrderTop(selectedShapeId);
    }
  }
  
  const handleChangeShapeOrderBottom = (e) => {
    e.stopPropagation();
    if(selectedShapeId) {
      onChangeShapeOrderBottom(selectedShapeId);
    }
  }

  return (
    <ContextMenu
      list={[
        { label: "삭제하기", handler: handleDeleteShape },
        { label: "맨 뒤로 보내기", handler: handleChangeShapeOrderBottom },
        { label: "맨 앞으로 보내기", handler: handleChangeShapeOrderTop }
      ]}
    >
      {children}
    </ContextMenu>
  )
}

export default ShapeContextMenu;