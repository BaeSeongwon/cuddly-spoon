/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";

import PropTypes from "prop-types";
import ControllerButton from "./ControllerButton";

function Controller({onChangeShape, onClearCanvas}) {
  const [ activeButton, setActiveButton ] = useState('circle');
  const button_container = css({
    display: 'inline-block',
    margin: '0px 5px'
  });

  const getActive = (type) => {
    if(type && activeButton === type) {
      return true;
    } else {
      return false;
    }
  }

  const handleChangeShape = (shape) => {
    setActiveButton(shape);
    onChangeShape(shape);
  }

  return (
    <div data-testid="controller">
      <div css={button_container}>
        <ControllerButton 
          label="Box"
          active={getActive("box")}
          onClick={() => handleChangeShape("box")}
        />
      </div>
      <div css={button_container}>
        <ControllerButton 
          label="Circle"
          active={getActive("circle")}
          onClick={() => handleChangeShape("circle")}
        />
      </div>
      <div css={button_container}>
        <ControllerButton 
          label='Clear' 
          onClick={onClearCanvas}
        />
      </div>
    </div>
  )
}

Controller.propTypes = {
  onChangeShape: PropTypes.func,
  onClearCanvas: PropTypes.func
}

Controller.defaultProps = {
  onChangeShape: () => {},
  onClearCanvas: () => {}
}

export default Controller;