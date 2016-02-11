import angular from 'angular';
import menu from './menu/menu';
import productList from './product/list'; 
import productDetails from './product/details';

export default angular.module('picnic.app', [
  'ngRoute',
  menu.name,
  productList.name,
  productDetails.name
])
  .component('picnicApp', {
    template: `
      <menu></menu>
      <ng-view></ng-view>
    `
  })
  .config(picnicAppConfig);
  
//@ngInject
function picnicAppConfig($locationProvider, $routeProvider){
  $locationProvider.html5Mode(true);
  
  $routeProvider
    .when('/list', {
      template: '<product-list></product-list>'
    })
    .when('/list/:productId', {
      template: '<product-details></product-details>'
    })
    .otherwise('/');
} 
