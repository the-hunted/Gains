angular.module('masa.services', ['ngStorage'])
.factory('StorageFac', function($localStorage) {
  $localStorage = $localStorage.$default({
    workouts: {}
  });

  var getAll = function() {
    return $localStorage.workouts;
  };

  var getByDate = function(date) {
    return $localStorage.workouts[date];
  };

  var remove = function(date) {
    delete $localStorage.workouts[date];
  };

  var add = function(exerciseData, date) {
    $localStorage.workouts[date] = exerciseData;
    console.log('$localStorage', $localStorage);
  };

  return {
    getAll: getAll,
    remove: remove,
    add: add,
    getByDate: getByDate,
    workoutDate: null
  };
})

.factory('LokiFac', function($q, Loki) {
  var _db;
  var _workouts;

  var initDB = function(){
    //var adapter = new LokiCordovaFSAdapter({"prefix": "loki"});
    _db = new Loki('workoutsDB', {
      autosave: true,
      autosaveInterval: 1000,
      //adapter: adapter
    });
  }

  var getAll = function(){
    return $q(function(resolve, reject){
      var options = {};
      _db.loadDatabase(options, function(){
        _workouts = _db.getCollection('workouts');
        if(!_workouts){
          _workouts = _db.addCollection('workouts');
        }
        resolve(_workouts.data);
      }); 
    });
  };

  var addWorkout = function(workout){
    console.log('addWorkout workout', workout);
    _workouts.insert(workout);
    console.log('_workouts after add', _workouts);
  };

  var getByDay = function(day){
    var data = _workouts.find({date: day});
    console.log('data from getbyday', data);
    return data;
  }

  var getRecent = function(day){
    var workView = _workouts.addDynamicView('newWorkouts');
    workView.applyWhere(function(obj) {
      return obj.date <= day;
    });
    workView.applySort(function(obj1, obj2){
      return obj2.date - obj1.date;
    });
    console.log('workview', workView.data());
    return workView.data();
  }

  var updateWorkout = function(workout) {
    _workouts.update(workout);
    console.log('_workouts after update', _workouts);
  }

  return {
    initDB: initDB,
    getAll: getAll,
    getByDay: getByDay,
    getRecent: getRecent,
    addWorkout: addWorkout,
    updateWorkout: updateWorkout
  }
})

.factory('WorkoutsFac', function ($http, $window, StorageFac, LokiFac) { // throw into workout planner controller
  var storeWorkout = function(exercisesData) {
    StorageFac.add(exercisesData.date, exercisesData.data);
  };

  var getWorkoutHistory = function() {
    var today = (new Date()).setHours(0, 0, 0, 0);
    var workouts = LokiFac.getRecent(today);
    console.log('getWorkoutHistory workouts', workouts);
    
    //var workouts = StorageFac.getAll();
    // if (!workouts) {
    //   return false;
    // }
    // var MILI_DAY = 86400000;

    // // var today = (new Date()).setHours(0, 0, 0, 0);
    // var sortedDates = Object.keys(workouts).sort();

    // if (today in workouts) {
    //   sortedDates.splice(0, sortedDates.indexOf(today) + 1);
    // } else {
    //   if (sortedDates[0] > today) {
    //     return false;
    //   }
    //   var foundClosestDate = false;
    //   var dateToCheck = today - MILI_DAY;

    //   while (!foundClosestDate) {
    //     if (dateToCheck in workouts) {
    //       sortedDates.splice(0, sortedDates.indexOf(dateToCheck) + 1);
    //       foundClosestDate = true;
    //     } else {
    //       dateToCheck -= MILI_DAY;
    //     }
    //   }
    // }

    // var workoutsToShow = [];

    // var currDate = today;

    // for (let i = sortedDates.length - 1; i >= sortedDates.length - 11 && i >= 0; i--) {
    //   if (sortedDates[i] in workouts) {
    //     var exercise = {};
    //     exercise[currDate] = workouts[currDate];
    //     workoutsToShow.push(exercise);
    //   }
    //   currDate -= MILI_DAY;
    // }

    // return workoutsToShow;
    return workouts;
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
