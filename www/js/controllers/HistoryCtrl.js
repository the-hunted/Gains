app.controller('HistCtrl', function ($scope, WorkoutsFac, StorageFac) {
  $scope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    return group.show;
  };

  $scope.history = WorkoutsFac.getWorkoutHistory();

  if ($scope.history) {
    console.log($scope.history);
    $scope.dates = $scope.history.map(function(exerciseObj) {
      return Object.keys(exerciseObj)[0];
    });

    console.log($scope.dates);
  }
});
