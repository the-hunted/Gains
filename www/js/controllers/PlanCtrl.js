app.controller('PlanCtrl', ['$scope', '$stateParams', 'ExerciseList', 'StorageFac', function ($scope, $stateParams, ExerciseList, StorageFac) {
  
  $scope.day;
  $scope.exercises = [];

  function showWorkout() {
    var dayOf = StorageFac.workoutDate;
    if(dayOf){
      var workout = StorageFac._getByDate(dayOf);
      if(workout) {
        $scope.exercises = workout;
        console.log('showWorkout scope exercises', $scope.exercises);
      }
    } else {
        $scope.day = new Date().setHours(0, 0, 0, 0);

        console.log('nothing loaded from service, day set', $scope.day);
    }
  }

  showWorkout();

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
 
  //list of all the exercises a user can select
  $scope.liftList = ExerciseList;

  //used to add another lift for the day's workout
  $scope.addNewLift = function(){
    var exerciseRecorded = JSON.stringify($scope.exercise);
    exerciseRecorded = JSON.parse(exerciseRecorded); //create clone of the $scope.exercise object
    $scope.exercises.push(exerciseRecorded); //push that clone to the $scope.exercises object
    console.log('exercises', $scope.exercises);
  }

  $scope.logWorkout = function() { // takes the exercises collection and saves to local storage
    StorageFac._add($scope.exercises, $scope.day);
  };

  $scope.$on("$destroy", function(){
    StorageFac.workoutDate = null;
    console.log('storage fac destroyed', StorageFac.workoutDate);
  })
}]);