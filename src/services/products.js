import angular from 'angular';
import core from '../picnic.core';

export default angular.module('picnic.product.service', [
  'ngResource',
  core.name
])
.provider('products', productProvider);

// @ngInject
function productProvider(picnicApiBaseUrl){
  const productProvider = this;
  
  productProvider.baseApi = picnicApiBaseUrl;
  
  this.$get = productService;
  
  // @ngInject
  function productService($resource){
    return $resource(productProvider.baseApi + 'products/:id');
  }
}