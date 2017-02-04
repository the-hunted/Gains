app.controller('HistCtrl', function ($scope, WorkoutsFac, StorageFac, LokiFac) {
  var thisObj = this;
  $scope.history;
  $scope.$watch('$viewContentLoaded', function(){
    console.log('loading started');
    LokiFac.initDB();
    LokiFac.getAll()
      .then(function(wods){
        thisObj.wods = wods;
        $scope.history = WorkoutsFac.getWorkoutHistory();
        console.log('scope history', $scope.history);
      });
  });
});
