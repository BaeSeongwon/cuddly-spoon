/** @jsxImportSource @emotion/react */
import { useState, useRef, Fragment } from "react";
import { css } from "@emotion/react";
import { Square, Circle } from "./shapes";

import CanvasHandler from "./CanvasHandler";
import Shape from "./Shape";

function Canvas() {
  const [ shapeList, setShapeList ] = useState([]);
  const canvasRef = useRef();
  const canvasHandler = new CanvasHandler();

  const handleMouseDown = (e) => {
    if(canvasRef) {
      canvasHandler.removeElementDom();
      canvasHandler.setDragState(true);
      
      const shape = new Square(e.clientX, e.clientY);
      const shapeElement = canvasHandler.getElementDom(shape);

      canvasRef.current.appendChild(shapeElement);
    }    
  }

  const handleMouseUp = () => {
    canvasHandler.setDragState(false);
    
    if(canvasHandler.getShape()) {
      setShapeList([...shapeList, (
        <Shape 
          style={canvasHandler.getShape().getShapeInfo()}
        />
      )])
    }
    
    canvasHandler.removeElementDom();
  }

  const handleMouseMove = (e) => {
    if(e) {
      canvasHandler.moveElementDom(e.clientX, e.clientY);
    }    
  }

  return (
    <div
      data-testid="canvas"
      ref={canvasRef}
      css={css({
        width: '100%',
        height: '100%',
        border: '1px solid black'
      })}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {shapeList.map((shape, index) => (
        <Fragment key={index}>{shape}</Fragment>
      ))}
    </div>
  )
}

export default Canvas;