/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { Circle, Square } from "../canvas/shapes";

import PropTypes from "prop-types";
import ControllerButton from "./ControllerButton";

function Controller({initActiveButton, onChangeShape, onClearCanvas}) {
  const [ activeButton, setActiveButton ] = useState(null);
  const button_container = css({
    display: 'inline-block',
    margin: '0px 5px'
  });

  useEffect(() => {
    if(initActiveButton) {
      handleChangeShape(initActiveButton);
    }
  }, []);

  const getActive = (type) => {
    if(type && activeButton === type) {
      return true;
    } else {
      return false;
    }
  }

  const handleChangeShape = (shape) => {
    setActiveButton(shape);

    if(shape === "box") {
      onChangeShape(new Square());
    } else if(shape === "circle") {
      onChangeShape(new Circle());
    }    
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
  initActiveButton: PropTypes.string.isRequired,
  onChangeShape: PropTypes.func.isRequired,
  onClearCanvas: PropTypes.func.isRequired
}

Controller.defaultProps = {
  initActiveButton: 'box',
  onChangeShape: () => {},
  onClearCanvas: () => {}
}

export default Controller;