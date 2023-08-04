/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";

import PropTypes from "prop-types";
import ContextMenu from "../context-menu/ContextMenu";

let isDrag = false;
let initLeft = null;
let initTop = null;

function Shape({id, style}) {
  const [ coordinates, setCoordinates ] = useState(null);
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
    if(e && e.button === LEFT_BUTTON_TYPE) {
      e.stopPropagation();
      isDrag = true;
    }
  }

  const handleMouseMove = (e) => {
    if(e && e.button === LEFT_BUTTON_TYPE) {
      if(isDrag) {
        if(!initLeft && !initTop) {
          initLeft = e.clientX - coordinates.left;
          initTop = e.clientY - coordinates.top;
        } else {
          setCoordinates({
            left: e.clientX - initLeft,
            top: e.clientY - initTop
          })
        }
      }
    }
  }

  const handleMouseUp = (e) => {
    if(e && e.button === LEFT_BUTTON_TYPE) {
      e.stopPropagation();
      isDrag = false;
    }
  }

  return (
    coordinates && (
      <ContextMenu>
        <div
          data-testid="shape"
          css={css({
            width: style.width,
            height: style.height,
            border: style.border,
            borderRadius: style.borderRadius,
            position: style.position,
            left: `${coordinates.left}px`,
            top: `${coordinates.top}px`
          })}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </ContextMenu>
      
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