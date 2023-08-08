/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import PropTypes from "prop-types";

function ContextMenu({children, list}) {
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
          top: visible ? visible.top : 0,
          zIndex: 999999
        })}
      >
        <ul
          css={css({
            listStyle: 'none',
            padding: '0px',
            margin: '0px'
          })}
        >
          {list.map(({label, handler}, index) => (
            <li
              key={index}
              css={css`
              padding: 5px;
                cursor: pointer;

                &:hover {
                  background-color: gray;
                  color: white;
                }
              `}
              onClick={handler}
              onMouseDown={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
            >
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

ContextMenu.propTypes = {
  children: PropTypes.element.isRequired,
  list: PropTypes.array.isRequired
}

ContextMenu.defaultProps = {
  list: []
}

export default ContextMenu;