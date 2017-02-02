app.controller('PlanCtrl', ['$scope', '$stateParams', 'ExerciseList', function ($scope, $stateParams, ExerciseList) {
  
  $scope.exercises = [];
  
  var date = new Date();
  date = date.setHours(0, 0, 0, 0);
  console.log('date', date);

  $scope.exercise =  {
    name: "",
    target_weight: 0,
    actual_weight: 0,
    sets: {
      1: {
        target_reps: 0,
        actual_reps: 0
      },
      2: {
        target_reps: 0,
        actual_reps: 0
      },
      3: {
        target_reps: 0,
        actual_reps: 0
      },
      4: {
        target_reps: 0,
        actual_reps: 0
      },
      5: {
        target_reps: 0,
        actual_reps: 0
      },
      6: {
        target_reps: 0,
        actual_reps: 0
      }
    }
  };
 
  $scope.liftList = ExerciseList;

  //used to add another lift for the day's workout
  $scope.lifts = [{id: 1}];
  $scope.addNewLift = function(){
    var exerciseRecorded = JSON.stringify($scope.exercise);
    exerciseRecorded = JSON.parse(exerciseRecorded); //create clone of the $scope.exercise object
    $scope.exercises.push(exerciseRecorded); //push that clone to the $scope.exercises object
    console.log('exercises', $scope.exercises);
  }

  $scope.logWorkout = function() { // takes the exercises collection 
    var exercises2Recorded = JSON.stringify($scope.exercises);
    console.log('exercise2Recorded', exercises2Recorded);
    console.log('exercises', $scope.exercises);
  };
}]);