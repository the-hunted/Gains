app.controller('InkCtrl', ['$scope', '$stateParams', 'ExerciseList', function ($scope, $stateParams, ExerciseList) {
  
  $scope.exercises = [];
  

  $scope.targetSets = [
    {id: 1, repsNum: 0}, 
    {id: 2, repsNum: 0},
    {id: 3, repsNum: 0}, 
    {id: 4, repsNum: 0}, 
    {id: 5, repsNum: 0}, 
    {id: 6, repsNum: 0}
  ];
  
  $scope.actualSets = [
    {id: 1, repsNum: 0}, 
    {id: 2, repsNum: 0}, 
    {id: 3, repsNum: 0}, 
    {id: 4, repsNum: 0}, 
    {id: 5, repsNum: 0}, 
    {id: 6, repsNum: 0}
  ];

  $scope.newExercise = {
    actualSets: $scope.actualSets,
    targetSets: $scope.targetSets
  };
  $scope.exerciseList = ExerciseList;

  //used to add another lift for the day's workout
  $scope.lifts = [{id: 1}];
  $scope.addNewLift = function(){
    $scope.exercises.push($scope.newExercise);
    for(let i in $scope.exercise){
      $scope.exercise[i].forEach(function(set) {
        set.repsNum = 0;
      });
    } //clear out the newExercise object
    var newId = $scope.lifts.length + 1;
    $scope.lifts.push({id: newId});
  };

  $scope.logWorkout = function() { // takes the exercises collection and sends it to a POST req, headed towards /workoutHistory
    console.log('about to send exercise data from workout to the server');
    //console.log('this is the exercise data:', $scope.exercises);
    //var user = $window.localStorage.getItem('user');
    //console.log('user found before sending data to server:', user);
    //var data = {exercises: $scope.exercises};
    //WorkoutsFac.storeWorkout(data);
  };
}]);
