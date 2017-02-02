app.controller('HomeCtrl', ['$scope', '$http','$ionicModal', '$ionicPopup', function($scope, $http, $ionicModal, $ionicPopup) {
  // var apiUrl = "http://quotes.rest/qod.json?category=inspire";

  // var buttonClick = document.getElementById('addGoals');
  //   buttonClick.addEventListener('click', function () {
  //       //location.href = 'https://twitter.com/satish_vr2011';
  //       window.open('https://twitter.com/satish_vr2011', '_blank');
  //   });

  $scope.goals = [];

  $scope.createGoal = function(input) {
    if ($scope.goals.length < 3) {
      $scope.goals.push({ goal: input });
      $scope.modal.hide();
    } else {
      $scope.showAlert();
    }
  };

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Too many goals!',
     template: 'Let\'s focus on your current goals first! Complete them before adding new goals.'
   });
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  // $scope.getQuote = function () {
  //   $http.get(apiUrl)
  //   .then(function(response) {
  //     var data = response.data.contents.quotes;
  //     data.forEach(function(item) {
  //       $scope.quote = item
  //     });
  //   })
  //   .catch(function(error) {
  //     console.log ('Error getting from Quote API', error);
  //   });
  // }

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

}]);