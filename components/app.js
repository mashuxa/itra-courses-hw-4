import getDataAsync from './getDataAsync.js';

const currencyApp = (function () {

  getDataAsync('./data/data.json').then(data => {
    console.log(data);
  });


})();