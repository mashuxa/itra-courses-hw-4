import Graph from './Graph.js';
import Coordinate from './Coordinate.js';

(function () {
  fetch('./data/data.json')
    .then(response => response.json())
    .then(data => {
      let canvas = document.getElementById('canvas');
      let graphCoordinates = data.map((coordinate) => {
        return new Coordinate(Number.parseFloat(coordinate.month), Number.parseFloat(coordinate.currencyValue));
      });

      let graph = new Graph(canvas, graphCoordinates, 17);
      graph.drawGraph();

      window.addEventListener('resize', () => {
        graph.drawGraph();
      });
    });
})();
