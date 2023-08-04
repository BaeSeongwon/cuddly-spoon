/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import PropTypes from "prop-types";

function ContextMenu({children}) {
  const [ visible, setVisible ] = useState(false);
  
  const handleContextMenu = (e) => {
    e.preventDefault();

    if(visible) {
      setVisible(false);

      setTimeout(() => {
        setVisible({left: e.clientX, top: e.clientY});
      }, 100)
    } else {
      setVisible({left: e.clientX, top: e.clientY});
    }
  }

  const handleClick = () => {
    setVisible(false);
  }

  const handleClickMenu = (e) => {
    e.stopPropagation();
    e.preventDefault();
    alert('???')
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
          border: '1px solid black',
          position: 'absolute',
          backgroundColor: 'white',
          left: visible ? visible.left : 0,
          top: visible ? visible.top : 0
        })}
      >
        <ul
          css={css({
            listStyle: 'none',
            padding: '0px',
            margin: '0px'
          })}
        >
          <li
            css={css`
              padding: 5px;
              cursor: pointer;

              &:hover {
                background-color: gray;
                color: white;
              }
            `}
            onClick={handleClickMenu}
          >
            <span>삭제하기</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

ContextMenu.propTypes = {
  children: PropTypes.element.isRequired
}

export default ContextMenu;