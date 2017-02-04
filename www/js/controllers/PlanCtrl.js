app.controller('PlanCtrl', ['$scope', '$stateParams', 'ExerciseList', 'StorageFac', function ($scope, $stateParams, ExerciseList, StorageFac) {
  
  $scope.day;
  $scope.exercises = [];
  $scope.today = new Date().setHours(0, 0, 0, 0);

  function showWorkout() {
    var dayOf = StorageFac.workoutDate;
    if(dayOf){
      $scope.day = dayOf;
    } else {
      $scope.day = $scope.today;
    }
    var workout = StorageFac.getByDate($scope.day);
    if(workout) {
      $scope.exercises = workout;
    }
  }

  //when the view loads, display the workout for the selected date
  $scope.$watch('$viewContentLoaded', function(){
    showWorkout();
  });

  $scope.exercise =  {
    name: "",
    target_weight: null,
    actual_weight: null,
    sets: {
      1: {
        target_reps: null,
        actual_reps: null
      },
      2: {
        target_reps: null,
        actual_reps: null
      },
      3: {
        target_reps: null,
        actual_reps: null
      },
      4: {
        target_reps: null,
        actual_reps: null
      },
      5: {
        target_reps: null,
        actual_reps: null
      },
      6: {
        target_reps: null,
        actual_reps: null
      }
    }
  };
 
  //list of all the exercises a user can select
  $scope.liftList = ExerciseList;

  //prevent user from being able to edit 'Actual' fields if date is in the future
  // $scope.canEdit = function() {
  //   if()
  // }

  //used to add another lift for the day's workout
  $scope.addNewLift = function() {
    var exerciseRecorded = JSON.stringify($scope.exercise);
    exerciseRecorded = JSON.parse(exerciseRecorded); //create clone of the $scope.exercise object
    $scope.exercises.push(exerciseRecorded); //push that clone to the $scope.exercises object
  }

  //takes the exercises collection and saves to local storage
  $scope.logWorkout = function() {
    console.log('scope day for saved workout', $scope.day);
    StorageFac.add($scope.exercises, $scope.day);
  };

  //sets the workoutDate back to null when user leaves plan view
  $scope.$on("$destroy", function(){
    StorageFac.workoutDate = null;
    console.log('storage fac destroyed', StorageFac.workoutDate);
  });
}]);