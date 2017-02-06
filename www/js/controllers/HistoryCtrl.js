app.controller('HistCtrl', function ($scope, WorkoutsFac, StorageFac, LokiFac, ionicMaterialMotion) {
  LokiFac.initDB();
  $scope.history = [];

  $scope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    return group.show;
  };

  $scope.onItemDelete = function(item) {
    $scope.history.splice($scope.history.indexOf(item), 1);
    LokiFac.deleteWorkout(item.date);
  };

  $scope.$watch('$viewContentLoaded', function(){
    LokiFac.getAll()
      .then(function(wods){
        $scope.history = WorkoutsFac.getWorkoutHistory();
      });
  });

  angular.element(document).ready(function () {
    ionicMaterialMotion.ripple();
  });
});
