import angular from 'angular';

export default angular.module('picnic.menu', [
  'ngRoute'
])
.component('menu', {
  template: `
    <a href="/">
      <img src="/img/picnic-logo.png" />
    </a>
    <nav>
      <ul>
        <li ng-repeat="route in menu.routes">
          <a ng-href="{{route.href}}">
            {{route.title}}
          </a>
        </li>
      </ul>
    </nav>
  `,
  controller: productlistController,
  controllerAs: 'menu'
});

// @ngInject
function productlistController($route){
  this.routes = [{
    href: '/list',
    title: 'producten'
  }];
}