import angular from 'angular';
import productService from '../services/products';
import productListItem from './listitem';
import productDetails from './details';

export default angular.module('picnic.productlist.component', [
  productService.name,
  productListItem.name,
  productDetails.name
])
.component('productList', {
  template: `
    <h1>Producten</h1>
    <div>
      <product-list-item 
        product="product" 
        ng-repeat="product in productlist.products track by product.id"
        ng-click="productlist.openModal($event, product.id)">
      </product-list-item>
    </div>
    <modal on-close="productlist.closeModal()" ng-if="productlist.selectedProductId">
      <product-details id="productlist.selectedProductId"></product-details>
    </modal>
  `,
  controller: productlistController,
  controllerAs: 'productlist'
})

// @ngInject
function productlistController($window, products){
  this.products = products.query();
  this.openModal = openModal;
  this.closeModal = closeModal;
  
  let isMobile = true;
  const tabletMin = 768;
  const mql = $window.matchMedia(`screen and (max-width: ${tabletMin - 1}px)`);
  mql.addListener(handleOrientationChange);
  handleOrientationChange(mql)
  
  function openModal(evt, productId){
    if(isMobile){
      return;
    }
    
    this.selectedProductId = productId;
    
    evt.stopPropagation();
    evt.preventDefault();
  }
  
  function closeModal(){
    this.selectedProductId = undefined;
  }
  
  function handleOrientationChange(mql) {
    isMobile = !!mql.matches;
  }
}