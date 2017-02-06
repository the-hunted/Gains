angular.module('masa.services', [])
.factory('StorageFac', function() {
  return { workoutDate: null };
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

  var addWorkout = function(workout, callback){
    _workouts.insert(workout);
    console.log('_workouts after add', _workouts);
    callback();
  };

  var getByDay = function(day){
    var data = _workouts.find({date: day});
    console.log('data from getbyday', data);
    return data;
  };

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
  };

  var updateWorkout = function(workout, callback) {
    _workouts.update(workout);
    console.log('_workouts after update', _workouts);
    callback();
  };

  var deleteWorkout = function(date) {
    _workouts.removeWhere({ 'date': date });
  };

  return {
    initDB: initDB,
    getAll: getAll,
    getByDay: getByDay,
    getRecent: getRecent,
    addWorkout: addWorkout,
    updateWorkout: updateWorkout,
    deleteWorkout: deleteWorkout
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

    return workouts;
  };

  return {
    storeWorkout: storeWorkout,
    getWorkoutHistory: getWorkoutHistory
  };
})
