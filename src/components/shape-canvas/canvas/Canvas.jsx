/** @jsxImportSource @emotion/react */
import { useRef, useEffect, useContext } from "react";
import { css } from "@emotion/react";
import { Square, Circle } from "../shapes/core";
import { ShapeCanvasContext } from "../ShapeCanvasProvider";
import { LEFT_BUTTON_TYPE } from "../config";

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
    getMostTopZindexAndUpdate
  } = useContext(ShapeCanvasContext);
  
  const canvasRef = useRef();
  const shapeManager = new ShapeManager();
  const shapeFactory = new ShapeFactory();

  useEffect(() => {
    if(canvasRef) {
      const { left, top, right, bottom } = canvasRef.current.getBoundingClientRect();
      setCanvasBoundary({left, right, top, bottom});
    }    
  }, [canvasRef, setCanvasBoundary])

  const handleMouseDown = (e=null) => {
    if(canvasRef && selectedShapeType && e.button === LEFT_BUTTON_TYPE && e.target.getAttribute("data-shapeid") === null) {
      shapeManager.setShape(shapeFactory.createShape(selectedShapeType));
      shapeManager.setDragState(true);
      shapeManager.getShape().init(e.clientX, e.clientY, getMostTopZindexAndUpdate());
      shapeDomManager = new ShapeDomManager(shapeManager.getShape());

      const shapeElement = shapeDomManager.getElement();
      if(shapeElement) {
        canvasRef.current.appendChild(shapeElement);
        canvasRef.current.addEventListener("mousemove", handleMouseMove);
        canvasRef.current.addEventListener("mouseup", handleMouseUp);
      }
    }    
  }

  const handleMouseUp = (e=null) => {
    if(e.button === LEFT_BUTTON_TYPE && e.target.getAttribute("data-shapeid") === null) {
      shapeManager.setDragState(false);
    
      if(shapeManager.getShape()) {
        setDrawnShapeList(drawnShapeList.concat(shapeManager.getShape()));
      }
      
      shapeDomManager.removeElement();

      canvasRef.current.removeEventListener("mousemove", handleMouseMove);
      canvasRef.current.removeEventListener("mouseup", handleMouseUp);
    }    
  }

  const handleMouseMove = (e=null) => {
    if(e && e.target.getAttribute("data-shapeid") === null && shapeManager.getDragState()) {
      const updateSize = shapeManager.updateShapeSize(e.clientX, e.clientY);
      if(updateSize) {
        const { width, height, left, top, borderRadius } = updateSize;
  
        shapeDomManager.updateElementSize(width, height, left, top, borderRadius);
      }      
    }    
  }

  const handleChangeShapeLocation = (id=null, left=null, top=null) => {
    if(id && left && top) {
      const findDrawnShape = drawnShapeList.find((shape) => shape.getId() === id);

      if(findDrawnShape) {
        findDrawnShape.setLeft(left);
        findDrawnShape.setTop(top);

        setDrawnShapeList(drawnShapeList);
      }
    }
  }

  return (
    <div
      data-testid="canvas"
      ref={canvasRef}
      css={css(`
        width: 100%;
        height: 100%;
        border: 1px solid black;
      `)}
      onMouseDown={handleMouseDown}
    >
      {drawnShapeList.map((shape) => {
        return (
          <Shape
            canvasRef={canvasRef}
            key={shape.getId()}
            id={shape.getId()}
            width={shape.getWidth()}
            height={shape.getHeight()}
            border={shape.getBorder()}
            borderRadius={shape.getBorderRadius()}
            position={shape.getPosition()}
            left={shape.getLeft()}
            top={shape.getTop()}
            zIndex={shape.getZindex()}
            onChangeShapeLocation={handleChangeShapeLocation}
          />
        )
      })}
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