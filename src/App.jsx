/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import { Controller, Canvas } from "./components";

function App() {
  const [ selectedShape, setSelectedShape ] = useState(null);

  const handleChangeShape = (shape) => {
    if(shape) {
      setSelectedShape(shape);
    }
  }

  const handleClearCanvas = () => {

  }

  return (
    <div
      css={css({
        height: 'calc(100% - 20px)',
        padding: '10px'
      })}
    >
      <div>
        <Controller
          initActiveButton={'box'}
          onChangeShape={handleChangeShape}
          onClearCanvas={handleClearCanvas}
        />
      </div>
      <div
        css={css({
          height: 'calc(100% - 35px)',
          padding: '10px 0px'
        })}
      >
        <Canvas 
          shape={selectedShape}
        />
      </div>
    </div>
  );
}

export default App;