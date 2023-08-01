/** @jsxImportSource @emotion/react */
import { useState, useRef, Fragment, useEffect } from "react";
import { css } from "@emotion/react";
import { Square, Circle } from "../shapes/core";

import PropTypes from "prop-types";
import Shape from "../shapes/Shape";
import ShapeManager from "../shapes/ShapeManager";
import ShapeDomManager from "../shapes/ShapeDomManager";

let shapeDomManager = null;

function Canvas({shape}) {
  const [ shapeList, setShapeList ] = useState([]);
  const canvasRef = useRef();
  const shapeManager = new ShapeManager();

  useEffect(() => {
    if(shape) {
      shapeManager.setShape(shape);      
    }
  }, [shape])

  const handleMouseDown = (e) => {
    if(canvasRef && shape) {
      shapeManager.setDragState(true);
      
      shape.init(e.clientX, e.clientY);
      shapeDomManager = new ShapeDomManager(shape);
      const shapeElement = shapeDomManager.getElement();

      if(shapeElement) {
        canvasRef.current.appendChild(shapeElement);
      }
    }    
  }

  const handleMouseUp = () => {
    shapeManager.setDragState(false);
    
    if(shapeManager.getShape()) {
      setShapeList([...shapeList, (
        <Shape
          key={shapeManager.getShape().getId()}
          id={shapeManager.getShape().getId()}
          style={shapeManager.getShape().getShapeInfo()}
        />
      )])
    }
    
    shapeDomManager.removeElement();
  }

  const handleMouseMove = (e) => {
    if(e) {
      const updateSize = shapeManager.updateShapeSize(e.clientX, e.clientY);
      if(updateSize) {
        const { width, height, left, top } = updateSize;

        console.log(width, height)
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