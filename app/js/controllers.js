'use strict';

/* Controllers */

var powerTabControllers = angular.module('powerTabControllers', []);

powerTabControllers.controller('powerTabCtrl', ['$scope',
  function($scope) {
      //----------------------
      // Tab Control Functions
      //----------------------

      // Focus on tab
      $scope.goToTab = function(tabId, winId) {
          console.log("go to tab:"+tabId);
          chrome.tabs.update(tabId, {active: true});
          chrome.windows.update(winId, {focused: true});
      };

      // Focus on window
      $scope.goToWindow = function(windowId) {
          console.log("go to widow:"+windowId);
          chrome.windows.update(windowId, {focused: true});
      };

      // New window
      $scope.newWindow = function(url) {
          chrome.windows.create({});
      };

      // Close window
      $scope.closeWindow = function(windowId) {
          chrome.windows.remove(windowId, function() {
              $scope.$apply();
          });
      };

      // Query for all tabs
      $scope.tabs = {};
      chrome.tabs.query({}, function(tbs) {
          console.log(tbs);
          $scope.tabs = tbs;
          $scope.$apply();
      });

      // Query for all windows
      $scope.windows = {};
      chrome.windows.getAll({"populate": true}, function(windows) {
          console.log(windows);
          $scope.windows = windows;
          $scope.$apply();
      });


      // Switch to LIST MODE or GRID MODE
      $scope.listMode = function() {
          $('#list-view').css('display', 'block');
          $('#grid-view').css('display', 'none');
      };
      $scope.gridMode = function() {
          $('#grid-view').css('display', 'block');
          $('#list-view').css('display', 'none');
      };



      //----------------------
      // UI SET-UP (drag/drop)
      //----------------------


  }]);


