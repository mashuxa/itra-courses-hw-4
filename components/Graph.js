import CanvasCoordinate from './CanvasCoordinate.js';

export default class Graph {

  constructor(canvasNode, values, minShowValueY) {
    this.node = canvasNode;
    this.parentNode = this.node.parentElement;
    this.values = values;
    this.ctx = this.node.getContext('2d');
    this.minValues = this.values.reduce((prevVal, currentVal) => {
      return {
        x: Math.min(prevVal.x, currentVal.x),
        y: Math.min(prevVal.y, currentVal.y),
      };
    });
    this.maxValues = this.values.reduce((prevVal, currentVal) => {
      return {
        x: Math.max(prevVal.x, currentVal.x),
        y: Math.max(prevVal.y, currentVal.y),
      };
    });
    this.minShowValueY = minShowValueY !== undefined ? minShowValueY : this.minValues.y;
  }

  drawGraph() {
    const canvasWidth = this.parentNode.offsetWidth;
    const canvasHeight = this.parentNode.offsetHeight;
    this.node.width = canvasWidth;
    this.node.height = canvasHeight;
    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const unitSize = {
      x: canvasWidth / (this.maxValues.x - this.minValues.x),
      y: canvasHeight / (this.maxValues.y - this.minShowValueY),
    };

    this.ctx.beginPath();
    this.ctx.moveTo((this.values[0].x - this.minValues.x) * unitSize.x, canvasHeight - (this.values[0].y - this.minShowValueY) * unitSize.y);
    let canvasCoordinates = this.values.map((coordinate) => {
      let canvasCoordinate = new CanvasCoordinate((coordinate.x - this.minValues.x) * unitSize.x, canvasHeight - (coordinate.y - this.minShowValueY) * unitSize.y, coordinate.x, coordinate.y);
      this.ctx.lineTo(canvasCoordinate.x, canvasCoordinate.y);
      return canvasCoordinate;
    });
    this.ctx.stroke();
    this.ctx.closePath();
    this.drawPoints(canvasCoordinates);

  }

  drawPoints(canvasCoordinates, pointClass = 'canvas__point') {
    let months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    Array.from(this.parentNode.getElementsByClassName(pointClass)).forEach((point) => {
      point.remove();
    });
    canvasCoordinates.forEach((coordinate) => {
      let point = document.createElement('div');
      point.className = pointClass;
      point.style.left = `${coordinate.x}px`;
      point.style.top = `${coordinate.y}px`;
      point.setAttribute('title', `${months[coordinate.xValue - 1]}: ${coordinate.yValue} BYN`);
      this.parentNode.appendChild(point);
    });
  }
}
