import { useContext } from "react";
import { ShapeCanvasContext } from "./ShapeCanvasProvider";

import ContextMenu from "../context-menu/ContextMenu";

function ShapeContextMenu({children}) {
  const { drawnShapeList, setDrawnShapeList, selectedShapeId } = useContext(ShapeCanvasContext);

  const handleDeleteShape = (e) => {
    e.stopPropagation();
    if(selectedShapeId) {
      setDrawnShapeList(drawnShapeList.filter((shape) => shape.getId() !== selectedShapeId));
    }
  }

  return (
    <ContextMenu
      list={[
        { label: "삭제하기", handler: handleDeleteShape },
        { label: "맨 뒤로 보내기", handler: () => {} },
        { label: "맨 앞으로 보내기", handler: () => {} }
      ]}
    >
      {children}
    </ContextMenu>
  )
}

export default ShapeContextMenu;