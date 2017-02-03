app.controller('HomeCtrl', ['$scope', '$http','$ionicModal', '$ionicPopup', function($scope, $http, $ionicModal, $ionicPopup) {
  var apiUrl = "http://quotes.rest/qod.json?category=inspire";

  //Home List Features
  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true
  $scope.goals = [];

  //Add user input to goal list
  $scope.createGoal = function(input) {
    console.log(input);
    if (input === undefined) {
      $scope.showAlertInputNull();
    } else if (input === null) {
      $scope.showAlertInputNull();
    } else if (input.replace(/\s/g, '').length === 0) {
      $scope.showAlertInputNull();
    } else {
      $scope.goals.push({ goal: input });
      $scope.modal.hide();
    }
  };

  //Delete list Item
  $scope.onItemDelete = function(item) {
    $scope.goals.splice($scope.goals.indexOf(item), 1);
  };

  //Modal animation
  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  //Show Modal
  $scope.openModal = function() {
    if($scope.goals.length < 3)
      $scope.modal.show();
    else {
      $scope.showAlertTooMany();
    }
  };

  //Close Modal
  $scope.closeModal = function() {

    $scope.modal.hide();

  };

  //Show Alerts
  $scope.showAlertTooMany = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Too many goals!',
     template: 'Let\'s focus on your current goals first! Complete them before adding new goals or delete them but sliding to the left.'
   });
  };

  $scope.showAlertInputNull = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Input Field Empty!',
     template: 'Please fill in a goal in the input field.'
   });
  };

  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // // Execute action on hide modal
  // $scope.$on('modal.hidden', function() {
  //   // Execute action
  // });
  // // Execute action on remove modal
  // $scope.$on('modal.removed', function() {
  //   // Execute action
  // });

  //Get quote from quote API
  $scope.getQuote = function () {
    $http.get(apiUrl)
    .then(function(response) {
      var data = response.data.contents.quotes;
      data.forEach(function(item) {
        $scope.quote = item
      });
    })
    .catch(function(error) {
      console.log ('Error getting from Quote API', error);
    });
  }


  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

}]);