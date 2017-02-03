angular.module('masa.services', ['ngStorage'])
.factory('StorageFac', function($localStorage) {
  $localStorage = $localStorage.$default({
    workouts: {}
  });

  var getAll = function() {
    return $localStorage.workouts;
  };

  var remove = function(date) {
    delete $localStorage.workouts[date];
  };

  var add = function(date, exerciseData) {
    $localStorage.workouts[date] = exerciseData;
  };

  return {
    getAll: getAll,
    remove: remove,
    add: add
  };
})

.factory('WorkoutsFac', function ($http, $window, StorageFac) { // throw into workout planner controller
  var storeWorkout = function(exercisesData) {
    StorageFac.add(exercisesData.date, exercisesData.data);
  };

  var getWorkoutHistory = function() {
    var workouts = StorageFac.getAll();
    if (!workouts) {
      return false;
    }
    var MILI_DAY = 86400000;

    var today = (new Date()).setHours(0, 0, 0, 0);
    var sortedDates = Object.keys(workouts).sort();

    if (today in workouts) {
      sortedDates.splice(0, sortedDates.indexOf(today) + 1);
    } else {
      if (sortedDates[0] > today) {
        return false;
      }
      var foundClosestDate = false;
      var dateToCheck = today - MILI_DAY;

      while (!foundClosestDate) {
        if (dateToCheck in workouts) {
          sortedDates.splice(0, sortedDates.indexOf(dateToCheck) + 1);
          foundClosestDate = true;
        } else {
          dateToCheck -= MILI_DAY;
        }
      }
    }

    var workoutsToShow = [];

    var currDate = today;

    for (let i = sortedDates.length - 1; i >= sortedDates.length - 11 && i >= 0; i--) {
      if (sortedDates[i] in workouts) {
        var exercise = {};
        exercise[currDate] = workouts[currDate];
        workoutsToShow.push(exercise);
      }
      currDate -= MILI_DAY;
    }

    return workoutsToShow;
  };

  // var getWorkoutHistory = function() {
  //   return $http({
  //     method: 'GET', // changed from GET becaus
  //     url: '/workoutHistory/' + $window.localStorage.getItem('user')
  //   })
  //   .then(function(res) {
  //     console.log('Successfully retrieved user\'s workout history from the db:', res.data);
  //     return res.data;
  //   }, function(err) {
  //     console.error(err);
  //     return err;
  //   })
  // };
  //
  // var storeWorkout = function(exercisesData) {
  //   return $http({
  //     method: 'POST',
  //     url: '/workoutHistory',
  //     data: exercisesData
  //   })
  //   .then(function(res) {
  //     console.log('Successfully posted the data server side where it can be stored in the user\'s db:', res.data);
  //   }, function(err) {
  //     console.error(err);
  //   })
  // };

  var decode = function() {
    console.log('decoding user token');
    var token = $window.localStorage.getItem('masaToken');
    console.log('token:', token);
    var user;

    if (!token) {
      console.log('the user has no TOKEN!');
    }

    else {
      user = jwt.decode(token, 'secret');
      return user;
    }

  };

  return {
    storeWorkout: storeWorkout,
    getWorkoutHistory: getWorkoutHistory
  };
})

.factory('AuthFac', function($http, $location, $window) {

  var signUp = function(signUpData) {

    return $http.post('/signup', signUpData)
      .then(function(res) {
        return res.data.token;
      }, function(err) {
        console.log('Signup Error: ', err)
      });
  };

  var login = function(loginData) {

    return $http.post('/signin', loginData)
    .then(function(res) {
      return res.data.token;

    }, function(err) {
      console.log('Login Error: ', err);
    });
  };


  //Not really working yet.
  var isAuth = function () {
    return !!$window.localStorage.getItem('masaToken');
  };

  var signout = function (){
    $window.localStorage.removeItem('user');
    $window.localStorage.removeItem('masaToken');
    $location.path('/signin');
  };


    return {
      signUp: signUp,
      login: login,
      isAuth: isAuth,
      signout: signout
    }

  });
