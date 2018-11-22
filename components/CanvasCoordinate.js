import Coordinate from './Coordinate.js';

export default class CanvasCoordinate extends Coordinate {
  constructor(x, y, xValue, yValue) {
    super(x, y);
    this.xValue = xValue;
    this.yValue = yValue;
  }
}
