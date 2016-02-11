import angular from 'angular';

export default angular.module('picnic.productprice.component', [])
  .component('productPrice', {
    bindings: {
      price: '='
    },
    template: `
      <var>{{productPrice.price.amount | currency:productPrice.currency }}</var>
      <em>{{productPrice.quota}}</em>
    `,
    controller: productpriceController,
    controllerAs: 'productPrice'
  })

const currencyMap = {
  'EUR': '€'
};

// @ngInject
function productpriceController($scope){
  $scope.$watch(() => this.price, price => {
    if(!price){ return; }
    
    this.currency = currencyMap[price.valuta];
  
    if(angular.isNumber(price.quota)){
      if(price.quota >= 1){
        this.quota = `${price.quota} kg`;
      } else {
        this.quota = `${price.quota * 1000} gr`;
      }
    } else {
      if(this.price.quota === '1p'){
        this.quota = 'per stuk';
      } else {
        this.quota = `${price.quota.replace('p', '')} stuks`;  
      }
    }
  }, true)
  
}