app.controller('PlanCtrl', ['$scope', '$stateParams', 'ExerciseList', 'StorageFac', 'LokiFac', '$ionicPopup', function ($scope, $stateParams, ExerciseList, StorageFac, LokiFac, $ionicPopup) {
  
  $scope.day;
  $scope.exercises = [];
  $scope.today = new Date().setHours(0, 0, 0, 0);
  $scope.isInDb = false;

  function showWorkout() {
    var dayOf = StorageFac.workoutDate;
    if(dayOf){
      $scope.day = dayOf;
    } else {
      $scope.day = $scope.today;
    }
   //get the workout data for that day from the Loki database
    var workout = LokiFac.getByDay($scope.day);
    if(workout[0]) {
      console.log('workout[0].work', workout[0].work);
      $scope.exercises = workout[0].work;
    }
  }

  //when the view loads, display the workout for the selected date
  $scope.$watch('$viewContentLoaded', function(){
    LokiFac.initDB();
    LokiFac.getAll();
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

  //show an alert whenever the user saves a workout
  $scope.successPopup = function() {
    var success = $ionicPopup.alert({
      title: 'Workout Saved',
      template: 'Your workout was saved!',
    });

    success.then(function(res) {
      console.log('tapped');
    });
  }

  //show a different alert if the user clicks save w/o inputting anything
  $scope.failPopup = function() {
    var fail = $ionicPopup.alert({
      title: 'Failed to Save',
      template: 'Type in your workout plan before saving.'
    });
  }
 
  //list of all the exercises a user can select
  $scope.liftList = ExerciseList;

  //used to add another lift for the day's workout
  $scope.addNewLift = function() {
    var exerciseRecorded = JSON.stringify($scope.exercise);
    exerciseRecorded = JSON.parse(exerciseRecorded); //create clone of the $scope.exercise object
    $scope.exercises.push(exerciseRecorded); //push that clone to the $scope.exercises object
  }

  //takes the exercises collection and saves to Loki database (instead of local storage)
  $scope.logWorkout = function() {
    if($scope.exercises.length > 0) {
      var daysWork = LokiFac.getByDay($scope.day); //use getByDay to get the $loki and meta
      if(daysWork.length > 0){
        console.log('dayswork', daysWork);
        LokiFac.updateWorkout({
          $loki: daysWork[0].$loki,
          meta: daysWork[0].meta,
          date: $scope.day,
          work: $scope.exercises
        }, function(){
          $scope.successPopup();
        });
      } else {
        LokiFac.addWorkout({
          date: $scope.day,
          work: $scope.exercises
        }, function(){
          $scope.successPopup();
        });
      }
    } else {
      $scope.failPopup();
    }
  };

  //sets the workoutDate back to null when user leaves plan view
  $scope.$on("$destroy", function(){
    StorageFac.workoutDate = null;
    console.log('storage fac destroyed', StorageFac.workoutDate);
  });
}]);