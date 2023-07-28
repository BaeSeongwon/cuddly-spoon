/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import PropTypes from "prop-types";

function SSCButton(props) {
  const handleClick = (e) => {
    if(props.onClick) {
      props.onClick(e);
    }    
  }

  return (
    <div>
      <button 
        onClick={handleClick}
        css={css({
          fontWeight: props.style.fontWeight
        })}
      >
        {props.label}
      </button>
    </div>
  )
}

SSCButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.shape({
    fontWeight: PropTypes.string
  })
}

SSCButton.defaultProps = {
  label: "Button",
  style: {
    fontWeight: "normal"
  }
}

export default SSCButton;