app.factory('StorageFac', function ($http, $window, $localStorage) { // throw into workout planner controller

  var _add = function(exerciseData) {
    var date = new Date().setHours(0, 0, 0, 0);
    if(!$localStorage.workouts){
      $localStorage.workouts = {};
    }
    $localStorage.workouts[date] = exerciseData;
    console.log('$localStorage', $localStorage);
  };

  return {
    _add: _add
  };
})

.factory('WorkoutFac', function ($http, $window, $localStorage) { // throw into workout planner controller

  var storeWorkout = function(exercisesData) {
    return $http({
      method: 'POST',
      url: '/workoutHistory',
      data: exercisesData
    })
    .then(function(res) {
      console.log('Successfully posted the data server side where it can be stored in the user\'s db:', res.data);
    }, function(err) {
      console.error(err);
    })
  };

  var getWorkoutHistory = function() {
    return $http({
      method: 'GET', // changed from GET becaus
      url: '/workoutHistory/' + $window.localStorage.getItem('user')
    })
    .then(function(res) {
      console.log('Successfully retrieved user\'s workout history from the db:', res.data);
      return res.data;
    }, function(err) {
      console.error(err);
      return err;
    })
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
  
