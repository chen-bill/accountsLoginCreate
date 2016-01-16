angular.module('starter.controllers', ['firebase', 'ui.router'])

.controller('menuController', function($scope, accountInfo) {
  $scope.profile = accountInfo.getProfile();
})

.controller('loginController', function ($scope, $state, accountInfo) {

  var ref = new Firebase('https://glowing-inferno-581.firebaseio.com/');
  var refProfile = new Firebase('https://glowing-inferno-581.firebaseio.com/profiles');

  $scope.error = '';
  $scope.createAccount = false;
  $scope.form = {name: '', email: '', password: ''};

  $scope.toggleState = function(){
    $scope.createAccount = !$scope.createAccount;
  };

  $scope.test = function(){
  }

  $scope.submit = function(){
    if(!$scope.createAccount) {
      ref.authWithPassword($scope.form, function(error, authData) {
      if (error) {
        $scope.error = error;
      } else {
        console.log("Authenticated successfully with payload:", authData.uid);
        accountInfo.setUserProfile(authData.uid, function(res){
          console.log(res);
          $state.go('app.rooms');
        });
      }
    });

    } else {
      ref.createUser($scope.form, function(error, userData) {
        if (error) {
          $scope.error = error;
        } else {
          console.log("Successfully created user");
          refProfile.child(userData.uid).set({ name: $scope.form.name, distance: 0, racesRan: 0}, function(error){
            if(error){
              console.log(error);
            } else {
              accountInfo.setUserProfile(userData.uid, function(res){
                console.log(res);
                $state.go('app.rooms');
              });
            }
          });
        }
      })
    };
  };
})


.controller('roomsController', function ($scope, $state, $stateParams, accountInfo){
  console.log('roomsController');
  $scope.profile = accountInfo.getProfile();
  $scope.$parent.profile = accountInfo.getProfile();
})

.controller('lobbyController', function(){
  console.log('lobbyController');
});