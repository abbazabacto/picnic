import angular from 'angular';
import productService from '../services/products';
import productPrice from './price';
import modal from '../ui/modal';

export default angular.module('picnic.productlistitem.component', [
  productService.name,
  productPrice.name,
  modal.name
])
.component('productListItem', {
  bindings: {
    product: '='
  },
  template: `
    <a ng-href="/list/{{productListItem.product.id}}">
      <strong>{{productListItem.product.title}}</strong>
      <img ng-src="{{productListItem.product.image}}" />
      <product-price price="productListItem.product.price"></product-price>
    </a>
  `,
  controller: productlistController,
  controllerAs: 'productListItem'
});

// @ngInject
function productlistController(products, $window){
  this.products = products.query();
}