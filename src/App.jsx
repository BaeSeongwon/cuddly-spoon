/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Controller, Canvas } from "./components";

function App() {
  return (
    <div
      css={css({
        height: 'calc(100% - 20px)',
        padding: '10px'
      })}
    >
      <div>
        <Controller />
      </div>
      <div
        css={css({
          height: 'calc(100% - 35px)',
          padding: '10px 0px'
        })}
      >
        <Canvas />
      </div>
    </div>
  );
}

export default App;
