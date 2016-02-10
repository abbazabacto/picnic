import angular from 'angular';
import picnicApp from './picnic.app';

const picnic = angular.module('picnic', [
  picnicApp.name
]);

angular.element(document).ready(function(){
  angular.bootstrap(document, [picnic.name]);
});