describe('Picnic App', function(){
  beforeEach(angular.mock.module('picnic.app'));
  
  var picnicApp;
  
  beforeEach(inject(function($rootScope, $compile){
    var $scope = $rootScope.$new();
    picnicApp = angular.element($compile('<picnic></picnic>')($scope));
    $scope.$digest();
  }));
  
  it('should be true', function(){
    expect(picnicApp.text()).toBe('€ 1,00 + € 2,00 = € 3,00');
  });
});