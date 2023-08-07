/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ShapeCanvasProvider from "./ShapeCanvasProvider";

import Canvas from "./canvas/Canvas";
import Controller from "./controller/Controller";

function ShapeCanvas() {
  
  return (
      <ShapeCanvasProvider>
        <div
          css={css(`
            height: 20px;
          `)}
        >
          <Controller/>
        </div>
        <div
          css={css(`
            height: calc(100% - 35px);
            padding: 10px 0px;
          `)}
        >
          <Canvas/>
        </div>
      </ShapeCanvasProvider>
  )
}

export default ShapeCanvas