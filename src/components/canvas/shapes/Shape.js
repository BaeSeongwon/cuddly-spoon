class Shape {
  constructor(left, top) {
    this.width = '5px';
    this.height = '5px';
    this.border = '1px solid black';
    this.position = 'absolute';
    this.left = `${left}px`;
    this.top = `${top}px`;
    this.initLeft = `${left}`;
    this.initTop = `${top}`;
  }

  getShapeInfo() {
    return {
      width: this.width,
      height: this.height,
      border: this.border,
      position: this.position,
      left: this.left,
      top: this.top,
      borderRadius: this.borderRadius
    }
  }

  updateShapeSize(left, top) {
    this.width = `${Math.abs(this.initLeft - parseInt(left))}px`;
    this.height = `${Math.abs(this.initTop - parseInt(top))}px`;
     
    if(this.initLeft - parseInt(left) > 0) {
      this.left = `${left}px`;  
    }

    if(this.initTop - parseInt(top) > 0) {
      this.top = `${top}px`;
    }
  }
}

export default Shape;