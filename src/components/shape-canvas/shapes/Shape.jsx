/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext, useRef } from "react";
import { css } from "@emotion/react";
import { ShapeCanvasContext } from "../ShapeCanvasProvider";

import PropTypes from "prop-types";
import ShapeContextMenu from "../ShapeContextMenu";

let isDrag = false;
let initLeft = null;
let initTop = null;

function Shape({id, style}) {
  const [ coordinates, setCoordinates ] = useState(null);
  const { setSelectedShapeId, canvasBoundary } = useContext(ShapeCanvasContext);
  const ref = useRef();
  const LEFT_BUTTON_TYPE = 0;

  useEffect(() => {
    if(style) {
      let left = 0;
      let top = 0;

      if(style.hasOwnProperty('left') && style.left !== null) {
        left = parseInt(style.left);
      }

      if(style.hasOwnProperty('top') && style.top !== null) {
        top = parseInt(style.top);
      }

      setCoordinates({left: left, top: top});      
    }
  }, []);

  const handleMouseDown = (e) => {
    // 상위 컴포넌트로 이벤트 버블링을 차단한다.
    e.stopPropagation();

    if(e.button === LEFT_BUTTON_TYPE && e.target.getAttribute("data-shapeid") === id) {
      isDrag = true;
      document.addEventListener('mouseup',handleMouseUp);
    }
  }

  const handleMouseMove = (e) => {
    e.stopPropagation();

    if(e.button === LEFT_BUTTON_TYPE && e.target.getAttribute("data-shapeid") === id) {
      if(isDrag) {
        if(!initLeft && !initTop) {
          initLeft = e.clientX - coordinates.left;
          initTop = e.clientY - coordinates.top;
        } else {
          const { left, right, top, bottom } = canvasBoundary;
          
          let newLeft = e.clientX - initLeft;
          newLeft = newLeft >= left ? newLeft : left;
          newLeft = (newLeft + parseInt(style.width)) <= right ? newLeft : (right - parseInt(style.width) - 2);

          let newTop = e.clientY - initTop;
          newTop = newTop >= top ? newTop : top;
          newTop = (newTop + parseInt(style.height)) <= bottom ? newTop : (bottom - parseInt(style.height) - 2);

          setCoordinates({ left: newLeft, top: newTop });
        }
      }
    }
  }

  const handleMouseUp = (e) => {
    e.stopPropagation();
    isDrag = false;
  }

  const handleContextMenu = (e) => {
    if(id) {
      setSelectedShapeId(id);
    }
  }

  return (
    coordinates && (
      <ShapeContextMenu>
        <div
          ref={ref}
          data-testid="shape"
          data-shapeid={id}
          css={css({
            width: style.width,
            height: style.height,
            border: style.border,
            borderRadius: style.borderRadius,
            position: style.position,
            left: `${coordinates.left}px`,
            top: `${coordinates.top}px`,
            backgroundColor: 'white'
          })}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onContextMenu={handleContextMenu}
        />
      </ShapeContextMenu>
      
    )
  )
}

Shape.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null]).isRequired
  ]),
  style: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    border: PropTypes.string,
    borderRadius: PropTypes.string,
    position: PropTypes.string,
    left: PropTypes.string,
    top: PropTypes.string
  })
}

Shape.defaultProps = {
  id: null,
  style: {
    width: '10px',
    height: '10px',
    border: '1px solid black',
    borderRadius: '1px',
    position: 'absolute',
    left: '0px',
    top: '0px'
  }
}

export default Shape;