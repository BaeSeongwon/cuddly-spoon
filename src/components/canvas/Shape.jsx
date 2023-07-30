/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import PropTypes from "prop-types";

function Shape({style}) {

  return (
    <div
      data-testid="shape"
      css={css({
        width: style.width,
        height: style.height,
        border: style.border,
        borderRadius: style.borderRadius,
        position: style.position,
        left: style.left,
        top: style.top
      })}
    />
  )
}

Shape.propTypes = {
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

export default Shape;