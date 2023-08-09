/** @jsxImportSource @emotion/react */
import { useContext, useRef, useLayoutEffect, useEffect } from "react";
import { css } from "@emotion/react";
import { ShapeCanvasContext } from "../ShapeCanvasProvider";
import { LEFT_BUTTON_TYPE } from "../config";

import PropTypes from "prop-types";
import ShapeContextMenu from "../ShapeContextMenu";

let isDrag = false;
let initLeft = null;
let initTop = null;

function Shape(props) {
  const { setSelectedShapeId, canvasBoundary, getMostTopZindex } = useContext(ShapeCanvasContext);
  const ref = useRef();

  useLayoutEffect(() => {
    if(ref && ref.current) {
      let left = 0;
      let top = 0;

      if(props.left) {
        left = parseInt(props.left);
      }

      if(props.top) {
        top = parseInt(props.top);
      }

      ref.current.style.left = `${left}px`;
      ref.current.style.top = `${top}px`;
    }
  }, [ref]);

  useEffect(() => {
    if(!isNaN(props.zIndex)) {
      ref.current.style.zIndex = `${props.zIndex}`;
    }      
  }, [props.zIndex]);

  const handleMouseDown = (e) => {
    e.stopPropagation();

    if(e.button === LEFT_BUTTON_TYPE && e.target.getAttribute("data-shapeid") === props.id) {
      isDrag = true;
      initLeft = e.clientX - parseInt(ref.current.style.left);
      initTop = e.clientY - parseInt(ref.current.style.top);

      ref.current.style.zIndex = getMostTopZindex();
      props.canvasRef.current.addEventListener("mousemove", handleMouseMove);
      props.canvasRef.current.addEventListener("mouseup", handleMouseUp);
    }
  }

  const handleMouseMove = (e) => {
    e.stopPropagation();

    if(isDrag && ref && ref.current) {
      const { left, right, top, bottom } = canvasBoundary;
        
      let newLeft = e.clientX - initLeft;
      newLeft = newLeft >= left ? newLeft : left;
      newLeft = (newLeft + parseInt(props.width)) <= right ? newLeft : (right - parseInt(props.width) - 2);
  
      let newTop = e.clientY - initTop;
      newTop = newTop >= top ? newTop : top;
      newTop = (newTop + parseInt(props.height)) <= bottom ? newTop : (bottom - parseInt(props.height) - 2);
  
      ref.current.style.left = `${newLeft}px`;
      ref.current.style.top = `${newTop}px`;
    }
  }

  const handleMouseUp = (e) => {
    e.stopPropagation();
    isDrag = false;
    
    if(ref && ref.current) {
      ref.current.style.zIndex = `${props.zIndex}`;
      props.onChangeShapeLocation(props.id, ref.current.style.left, ref.current.style.top);
    }

    document.removeEventListener("mouseup", handleMouseUp);
    props.canvasRef.current.removeEventListener("mousemove", handleMouseMove);
    props.canvasRef.current.removeEventListener("mouseup", handleMouseUp);
  }

  const handleContextMenu = () => {
    if(props.id) {
      setSelectedShapeId(props.id);
    }
  }

  return (
    <ShapeContextMenu>
      <div
        ref={ref}
        data-testid="shape"
        data-shapeid={props.id}
        css={css(`
          width: ${props.width};
          height: ${props.height};
          border: ${props.border};
          border-radius: ${props.borderRadius};
          position: ${props.position};
          background-color: white;
        `)}
        onMouseDown={handleMouseDown}
        onContextMenu={handleContextMenu}
      />
    </ShapeContextMenu>
  )
}

Shape.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null]).isRequired
  ]),
  canvasRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  width: PropTypes.string,
  height: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  position: PropTypes.string,
  left: PropTypes.string,
  top: PropTypes.string,
  zIndex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChangeShapeLocation: PropTypes.func
}

Shape.defaultProps = {
  id: null,
  width: '10px',
  height: '10px',
  border: '1px solid black',
  borderRadius: '1px',
  position: 'absolute',
  left: '0px',
  top: '0px',
  zIndex: 'auto',
  onChangeShapeLocation: () => {}
}

export default Shape;