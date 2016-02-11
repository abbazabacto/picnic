import angular from 'angular';
import productService from '../services/products';
import productPrice from './price';

export default angular.module('picnic.product.component', [
  productService.name,
  productPrice.name
])
.component('productDetails', {
  bindings: {
    id: '@'
  },
  template: `
    <div class="product-details-image-holder">
      <img ng-src="{{productDetails.product.image}}" />
      <product-price price="productDetails.product.price"></product-price>
    </div>
    <div class="product-details">
      <h1>{{productDetails.product.title}}</h1>
      <p>{{productDetails.product.description}}</p>
    </div>
  `,
  controller: productController,
  controllerAs: 'productDetails'
})

// @ngInject
function productController($attrs, $route, $scope, products){
  if(!$attrs.id){
    this.product = products.get({ id : $route.current.params.productId});
  } else {
    $scope.$parent.$watch($attrs.id, id => {
      if(!id){
        return;
      }
      
      this.product = products.get({ id });
    });  
  }
}