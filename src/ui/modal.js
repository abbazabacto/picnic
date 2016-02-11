import angular from 'angular';

export default angular.module('picnic.ui.modal', [])
  .directive('modal', function(){
    return {
      restrict: 'E',
      scope: {},
      require: 'modal',
      bindToController: {
        onClose: '&'
      },
      template: `
        <div class="modal-dialog">
          <button class="modal-close" ng-click="modal.onClose()">&times;</button>
          <ng-transclude></ng-transclude>
        </div>
      `,
      transclude: true,
      controller: function(){ },
      controllerAs: 'modal',
      link: function($scope, $element, $attrs, modalCtrl){
        var $dialog = $element.find('.modal-dialog').on('click', function(e){
          e.preventDefault();
          e.stopPropagation();
        });
        
        $element.on('click', function(){
          $scope.$apply(modalCtrl.onClose);
        });
        
        angular.element(document).on('keydown', function(e){
          if(e.keyCode === 27){
            $scope.$apply(modalCtrl.onClose);
          }
        });
        
        $scope.$on('$destroy', function(){
          $dialog.off('click');
          $element.off('click');
          angular.element(document).off('click');
        })
      }
    };
  });