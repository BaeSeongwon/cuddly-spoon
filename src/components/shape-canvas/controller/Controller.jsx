/** @jsxImportSource @emotion/react */
import { useContext } from "react";
import { css } from "@emotion/react";
import { ShapeCanvasContext } from "../ShapeCanvasProvider";

import PropTypes from "prop-types";
import ControllerButton from "./ControllerButton";

function Controller() {
  const { selectedShapeType, setSelectedShapeType, onClearDrawnShapeList } = useContext(ShapeCanvasContext);
  const button_container = css({
    display: 'inline-block',
    margin: '0px 5px'
  });

  const getActive = (type) => {
    if(type && selectedShapeType === type) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div data-testid="controller">
      <div css={button_container}>
        <ControllerButton 
          label="Box"
          active={getActive("box")}
          onClick={() => setSelectedShapeType("box")}
        />
      </div>
      <div css={button_container}>
        <ControllerButton 
          label="Circle"
          active={getActive("circle")}
          onClick={() => setSelectedShapeType("circle")}
        />
      </div>
      <div css={button_container}>
        <ControllerButton 
          label='Clear' 
          onClick={onClearDrawnShapeList}
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