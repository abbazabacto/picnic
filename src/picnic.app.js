const angular = require('angular');

export default angular.module('picnic.app', [])
  .component('picnic', {
    template: `{{ 1 | currency }} + {{ 2 | currency }} = {{ 1 + 2 | currency }}`
  });
