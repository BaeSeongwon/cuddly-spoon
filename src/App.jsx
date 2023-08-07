/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ShapeCanvas from "./components/shape-canvas/ShapeCanvas";

function App() {
  return (
    <div
      css={css({
        height: 'calc(100% - 20px)',
        padding: '10px'
      })}
    >
      <ShapeCanvas />
    </div>
  );
}

export default App;