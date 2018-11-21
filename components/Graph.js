export default class Graph {
  constructor(canvasEl, coordinates, minVal = 0) {
    this.node = canvasEl;
    this.ctx = this.node.getContext('2d');
    this.coordinates = coordinates;
    this.minVal = minVal;
  }

  get maxValues() {
    return this.coordinates.reduce((prevVal, currentVal) => {
      return {
        x: Math.max(prevVal.x, currentVal.x),
        y: Math.max(prevVal.y, currentVal.y),
      };
    });
  }
  get minValues() {
    return this.coordinates.reduce((prevVal, currentVal) => {
      return {
        x: Math.min(prevVal.x, currentVal.x),
        y: Math.min(prevVal.y, currentVal.y),
      };
    });
  }


  draw() {
    const maxVal = this.maxValues;
    const minVal = this.minValues;
    const canvasWidth = this.node.parentElement.offsetWidth;
    const canvasHeight = this.node.parentElement.offsetHeight;
    const bottomMargin = minVal.y;
    this.node.width = canvasWidth;
    this.node.height = canvasHeight;
    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const unitSize = {
      x: canvasWidth / (maxVal.x - minVal.x),
      y: canvasHeight / (maxVal.y - minVal.y),
    };


    this.ctx.beginPath();
    this.ctx.moveTo((this.coordinates[0].x - minVal.x) * unitSize.x, canvasHeight - (this.coordinates[0].y - bottomMargin) * unitSize.y);
    this.coordinates.forEach((coordinate) => {
      this.ctx.lineTo((coordinate.x - minVal.x) * unitSize.x, canvasHeight - (coordinate.y - bottomMargin) * unitSize.y);
    });
    this.ctx.stroke();
    this.ctx.closePath();


    console.log(bottomMargin);
  }
}