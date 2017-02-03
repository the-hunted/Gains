app.controller('HistCtrl', function ($scope, WorkoutsFac, StorageFac) {
  $scope.history = WorkoutsFac.getWorkoutHistory()

  if ($scope.history) {
    console.log($scope.history);
    $scope.dates = $scope.history.map(function(exerciseObj) {
      return Object.keys(exerciseObj)[0];
    });

    console.log($scope.dates);
  }
});
