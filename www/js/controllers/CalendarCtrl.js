app.controller('CalendarCtrl', ['$scope', '$location', 'StorageFac', function ($scope, $location, StorageFac) {
  $scope.example = {
    value: new Date(2017, 1, 20)
  };

  $scope.showDate = function(){
    StorageFac.workoutDate = $scope.example.value.getTime();
    console.log('StorageFac date', StorageFac.workoutDate);
    $location.path('/app/plan');
  };
}]);
