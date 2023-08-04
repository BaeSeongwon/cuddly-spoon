/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import PropTypes from "prop-types";

function ContextMenu({children}) {
  const [ visible, setVisible ] = useState(false);
  const [ coordinate, setCoordinate ] = useState(false);
  
  const handleContextMenu = (e) => {
    if(visible) {
      setVisible(false);

      console.log(e)
      setCoordinate({
        left: e.clientX,
        top: e.clientY
      });

      setTimeout(() => {
        setVisible(true);
      }, 100)
    } else {
      setVisible(true);
    }
  }

  const handleClick = () => {
    setVisible(false);
  }

  const getCoordinateValue = (type, defaultValue) => {
    if(coordinate && coordinate[type]) {
      return `${coordinate[type]}px`;
    } else {
      return defaultValue;
    }
  }

  return (
    <div 
      onContextMenu={handleContextMenu}
      onClick={handleClick}
    >
      {children}
      <div
        data-testid='context-menu'
        css={css({
          display: visible ? 'block' : 'none',
          width: '300px',
          border: '1px solid black',
          position: 'absolute',
          left: getCoordinateValue('left', 0),
          top: getCoordinateValue('top', 0)
        })}
      >
        <ul>
          <li>삭제하기</li>
          <li>맨 뒤로 보내기</li>
          <li>맨 앞으로 보내기</li>
        </ul>
      </div>
    </div>
  )
}

ContextMenu.propTypes = {
  children: PropTypes.element.isRequired
}

export default ContextMenu;