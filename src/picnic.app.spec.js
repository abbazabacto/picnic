describe('Picnic App', function(){
  beforeEach(angular.mock.module('picnic.app'));
  
  var picnicApp;
  
  beforeEach(inject(function($rootScope, $compile){
    var $scope = $rootScope.$new();
    picnicApp = angular.element($compile('<picnic-app></picnic-app>')($scope));
    $scope.$digest();
  }));
  
  it('should work and render some html', function(){
    expect(picnicApp.innerHTML).not.toBe('');
  });
});