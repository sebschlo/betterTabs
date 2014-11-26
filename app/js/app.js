'use strict';

/* App Module */

var powerTabber = angular.module('powerTabber', [
  'ngRoute',
  'powerTabControllers',
  'powerTabServices'
]);

powerTabber.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/mainView.html',
        controller: 'powerTabCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
