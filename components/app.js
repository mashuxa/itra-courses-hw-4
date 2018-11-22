import Graph from './Graph.js';
import Coordinate from './Coordinate.js';

(function () {
  fetch('./data/data.json')
    .then(response => response.json())
    .then(data => {
      const MIN_VAL_Y = 17;
      let canvas = document.getElementById('canvas');
      let graphValues = data.map((value) => {
        return new Coordinate(Number.parseFloat(value.month), Number.parseFloat(value.currencyValue));
      });

      let graph = new Graph(canvas, graphValues, MIN_VAL_Y);
      graph.drawGraph();


      window.addEventListener('resize', () => {
        graph.drawGraph();
      });
    });
})();
