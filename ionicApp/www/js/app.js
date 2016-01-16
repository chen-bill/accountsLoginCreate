angular.module('starter', ['ionic', 'starter.controllers'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: '/',
    templateUrl: 'templates/login.html',
    controller: 'loginController'
  })

  .state('app', {
    url: '/app',
    abstract: true, 
    templateUrl: 'templates/menu.html',
    controller: 'menuController'
  })

  .state('app.rooms', {
      url: '/rooms',
      views: {
        'menuContent': {
          templateUrl: 'templates/rooms.html',
          controller: 'roomsController',
          params: {
            test: 'tests',
          }
        }
      }
    })

  .state('app.room', {
    url: '/rooms/:roomId',
    templateUrl: 'templates/room.html',
    controller: 'lobbyController'
  });

  //default
  $urlRouterProvider.otherwise('/app/rooms');
});
