/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";

import ControllerButton from "./ControllerButton";

function Controller() {
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

  return (
    <div>
      <div css={button_container}>
        <ControllerButton 
          label="Box"
          active={getActive("box")}
          onClick={() => setActiveButton("box")}
        />
      </div>
      <div css={button_container}>
        <ControllerButton 
          label="Circle"
          active={getActive("circle")}
          onClick={() => setActiveButton("circle")}
        />
      </div>
      <div css={button_container}>
        <ControllerButton label='Clear' />
      </div>
    </div>
  )
}

export default Controller;