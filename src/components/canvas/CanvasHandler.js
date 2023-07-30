function CanvasHandler() {
  let isDragState = false;
  let shape = null;
  let element = null;

  return {
    getShape: () => {
      return shape;
    },

    setDragState: (_isDragState) => {
      isDragState = _isDragState;
    },

    getElementDom: (_shape) => {
      if(_shape) {
        shape = _shape;
        const { width, height, border, borderRadius, position, left, top } = shape.getShapeInfo();
      
        element = document.createElement("div");
        element.setAttribute('class', 'temp-div');
        element.style.width = width;
        element.style.height = height;
        element.style.border = border;
        element.style.borderRadius = borderRadius;
        element.style.position = position;
        element.style.left = left;
        element.style.top = top;

        return element;
      } else {
        return null;
      }
    },

    moveElementDom: (newLeft, newTop) => {
      if(isDragState && newLeft && newTop && element) {
        shape.updateShapeSize(newLeft, newTop);
        const { width, height, left, top, borderRadius } = shape.getShapeInfo();

        element.style.width = width;
        element.style.height = height;
        element.style.left = left;
        element.style.top = top;
        element.style.borderRadius = borderRadius;
      }
    },

    removeElementDom: () => {
      const element = document.querySelector('.temp-div');

      if(element) {
        element.remove();
      }
    }
  }
}

export default CanvasHandler;