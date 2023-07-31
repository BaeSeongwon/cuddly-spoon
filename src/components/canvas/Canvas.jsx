/** @jsxImportSource @emotion/react */
import { useState, useRef, Fragment } from "react";
import { css } from "@emotion/react";
import { Square, Circle } from "./shapes";

import PropTypes from "prop-types";
import CanvasHandler from "./CanvasHandler";
import Shape from "./Shape";

function Canvas({shape}) {
  const [ shapeList, setShapeList ] = useState([]);
  const canvasRef = useRef();
  const canvasHandler = new CanvasHandler();

  const handleMouseDown = (e) => {
    if(canvasRef && shape) {
      canvasHandler.removeElementDom();
      canvasHandler.setDragState(true);
      
      shape.init(e.clientX, e.clientY);
      const shapeElement = canvasHandler.getElementDom(shape);

      if(shapeElement) {
        canvasRef.current.appendChild(shapeElement);
      }
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

Canvas.propTypes = {
  shape: PropTypes.oneOfType([
    PropTypes.instanceOf(Square).isRequired,
    PropTypes.instanceOf(Circle).isRequired,
    PropTypes.oneOf([null]).isRequired
  ])
}

Canvas.defaultProps = {
  shape: null
}

export default Canvas;