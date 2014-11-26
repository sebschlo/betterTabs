'use strict';

/* Controllers */

var powerTabControllers = angular.module('powerTabControllers', []);

powerTabControllers.controller('powerTabCtrl', ['$scope',
  function($scope, Phone) {
    $scope.orderProp = 'age';
  }]);


