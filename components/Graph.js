import CanvasCoordinate from './CanvasCoordinate.js';

export default class Graph {
  constructor(canvasEl, coordinates, minShowValueY) {
    this.node = canvasEl;
    this.coordinates = coordinates;
    this.ctx = this.node.getContext('2d');
    this.minValues = this.coordinates.reduce((prevVal, currentVal) => {
      return {
        x: Math.min(prevVal.x, currentVal.x),
        y: Math.min(prevVal.y, currentVal.y),
      };
    });
    this.maxValues = this.coordinates.reduce((prevVal, currentVal) => {
      return {
        x: Math.max(prevVal.x, currentVal.x),
        y: Math.max(prevVal.y, currentVal.y),
      };
    });
    this.minShowValueY = minShowValueY !== undefined ? minShowValueY : this.minValues.y;
  }


  draw() {
    const canvasWidth = this.node.parentElement.offsetWidth;
    const canvasHeight = this.node.parentElement.offsetHeight;
    this.node.width = canvasWidth;
    this.node.height = canvasHeight;
    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const unitSize = {
      x: canvasWidth / (this.maxValues.x - this.minValues.x),
      y: canvasHeight / (this.maxValues.y - this.minShowValueY),
    };


    this.ctx.beginPath();
    this.ctx.moveTo((this.coordinates[0].x - this.minValues.x) * unitSize.x, canvasHeight - (this.coordinates[0].y - this.minShowValueY) * unitSize.y);
    let canvasCoordinates = this.coordinates.map((coordinate) => {
      let canvasCoordinate = new CanvasCoordinate((coordinate.x - this.minValues.x) * unitSize.x, canvasHeight - (coordinate.y - this.minShowValueY) * unitSize.y, coordinate.x, coordinate.y);
      this.ctx.lineTo(canvasCoordinate.x, canvasCoordinate.y);
      return canvasCoordinate;

    });
    this.ctx.stroke();
    this.ctx.closePath();
    console.log(canvasCoordinates);
  }
}