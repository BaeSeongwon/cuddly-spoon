/** @jsxImportSource @emotion/react */
import { useRef, Fragment, useEffect, useContext } from "react";
import { css } from "@emotion/react";
import { Square, Circle } from "../shapes/core";
import { ShapeCanvasContext } from "../ShapeCanvasProvider";

import PropTypes from "prop-types";
import Shape from "../shapes/Shape";
import ShapeManager from "../shapes/ShapeManager";
import ShapeDomManager from "../shapes/ShapeDomManager";
import ShapeFactory from "../shapes/ShapeFactory";

let shapeDomManager = null;

function Canvas() {
  const { 
    selectedShapeType, 
    drawnShapeList, 
    setDrawnShapeList, 
    setCanvasBoundary,
    getShapeZindex
  } = useContext(ShapeCanvasContext);
  
  const canvasRef = useRef();
  const shapeManager = new ShapeManager();
  const shapeFactory = new ShapeFactory();
  const LEFT_BUTTON_TYPE = 0;

  useEffect(() => {
    if(canvasRef) {
      const { left, top, right, bottom } = canvasRef.current.getBoundingClientRect();

      setCanvasBoundary({left, right, top, bottom});
    }    
  }, [canvasRef])

  const handleMouseDown = (e) => {
    if(canvasRef && selectedShapeType && e.button === LEFT_BUTTON_TYPE && e.target.getAttribute("data-shapeid") === null) {
      shapeManager.setShape(shapeFactory.createShape(selectedShapeType));
      shapeManager.setDragState(true);
      shapeManager.getShape().init(e.clientX, e.clientY, getShapeZindex());
      shapeDomManager = new ShapeDomManager(shapeManager.getShape());

      const shapeElement = shapeDomManager.getElement();

      if(shapeElement) {
        canvasRef.current.appendChild(shapeElement);
      }
    }    
  }

  const handleMouseUp = (e) => {
    if(e.button === LEFT_BUTTON_TYPE && e.target.getAttribute("data-shapeid") === null) {
      shapeManager.setDragState(false);
    
      if(shapeManager.getShape()) {
        setDrawnShapeList(drawnShapeList.concat(shapeManager.getShape()));
      }
      
      shapeDomManager.removeElement();
    }    
  }

  const handleMouseMove = (e) => {
    if(e && e.button === LEFT_BUTTON_TYPE && e.target.getAttribute("data-shapeid") === null) {
      const updateSize = shapeManager.updateShapeSize(e.clientX, e.clientY);
      if(updateSize) {
        const { width, height, left, top } = updateSize;

        shapeDomManager.updateElementSize(width, height, left, top);
      }      
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
      {drawnShapeList.map((shape) => (
        <Shape 
          key={shape.getId()}
          id={shape.getId()}
          style={shape.getShapeInfo()}
        />
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