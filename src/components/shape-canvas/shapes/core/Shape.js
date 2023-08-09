import uuid from "react-uuid";

class Shape {
  #left;
  #top;
  #id;
  #width;
  #height;
  #border;
  #position;
  #initLeft;
  #initTop;
  #zIndex;
  #borderRadius;

  constructor(left, top, borderRadius) {
    left = left ? left : 0;
    top = top ? top : 0;

    this.#id = uuid();
    this.#width = '5px';
    this.#height = '5px';
    this.#border = '1px solid black';
    this.#position = 'absolute';
    this.#left = `${left}px`;
    this.#top = `${top}px`;
    this.#initLeft = left;
    this.#initTop = top;
    this.#borderRadius = borderRadius;
  }

  init(left, top, zIndex) {
    this.#left = `${left}px`;
    this.#top = `${top}px`;
    this.#initLeft = left;
    this.#initTop = top;
    this.#width = '5px';
    this.#height = '5px';
    this.#zIndex = zIndex;
  }

  getId() {
    return this.#id;
  }

  getShapeInfo() {
    return {
      width: this.#width,
      height: this.#height,
      border: this.#border,
      position: this.#position,
      left: this.#left,
      top: this.#top,
      borderRadius: this.#borderRadius,
      zIndex: this.#zIndex
    }
  }

  setShapeInfo(width, height, border, position, left, top, borderRadius, zIndex) {
    this.#left = left;
    this.#top = top;
    this.#initLeft = left;
    this.#initTop = top;
    this.#width = width;
    this.#height = height;
    this.#zIndex = zIndex;
    this.#border = border;
    this.#position = position;
    this.#borderRadius = borderRadius;
  }

  toJson() {
    return {
      id: this.#id,
      width: this.#width,
      height: this.#height,
      border: this.#border,
      position: this.#position,
      left: this.#left,
      top: this.#top,
      borderRadius: this.#borderRadius,
      initLeft: this.#initLeft,
      initTop: this.#initTop,
      zIndex: this.#zIndex
    }
  }

  getInitLeft() {
    return this.#initLeft;
  }

  getInitTop() {
    return this.#initTop;
  }

  getLeft() {
    return this.#left;
  }

  getTop() {
    return this.#top;
  }

  getWidth() {
    return this.#width;
  }

  getHeight() {
    return this.#height;
  }

  getBorder() {
    return this.#border;
  }

  getBorderRadius() {
    return this.#borderRadius;
  }

  getPosition() {
    return this.#position;
  }

  getZindex() {
    return this.#zIndex;
  }

  setZindex(zIndex) {
    if(!isNaN(zIndex)) {
      console.log(this.#id, zIndex);
      this.#zIndex = zIndex;
    }
  }

  setWidth(width) {
    this.#width = width;
  }

  setHeight(height) {
    this.#height = height;
  }

  setTop(top) {
    this.#top = top;
  }

  setLeft(left) {
    this.#left = left;
  }

  setBorderRadius(radius) {
    this.#borderRadius = radius;
  }
}

export default Shape;