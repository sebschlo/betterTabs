'use strict';

/* App Module */

var powerTabber = angular.module('powerTabber', [
  'ngRoute',
  'chromeStorage',
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


// UI DIRECTIVES

powerTabber.directive('draggable', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.draggable({
                revert: "invalid",
                revertDuration: 200,
                scroll: false,
                start: function(event, ui) {
                    $(this).css('opacity', 0.5).css('z-index',999);
                },
                stop: function(event, ui) {
                    $(this).css('opacity',1);
                }
            });
        }
    };
});

powerTabber.directive('droppable', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.droppable({
                drop: function(event, ui) {
                    console.log("I WAS DROPPED!");
                    var toWindow = $(this);
                    var toWindowId = parseInt(toWindow.attr('windowId'));
                    var dragged = $(ui.draggable);
                    var tabId = parseInt(dragged.attr('tabid'));

                    // update chrome
                    // if dropped into the NEW WINDOW
                    if(toWindow.attr('id') === 'new-window') {

                        // Move tab
                        chrome.windows.create({tabId: tabId, focused: false});

                        // convert this "new window div" to a regular window div
                        var newWindowHtml = currWindow.parent().html();
                        var prevNumber = currWindow.parent().prev().children('.window').attr('count');
                        var newNumber = parseInt(prevNumber) + 1;
                        currWindow.attr('count', newNumber);
                        currWindow.children().children('.window-title').html("Window " + newNumber);
                        currWindow.removeAttr('id', 'new-window'); // colors should update

                        $(this).parent().parent().append('<li>'+newWindowHtml+'</li>');

                    } else {
                        // if dropped into an existing window, simply move the tab
                        chrome.tabs.move(tabId, {windowId: toWindowId, index: -1});
                    }

                    // update list view html
                    dragged.parent().remove();
                    toWindow.children(".window-tabs").append('<li>'+dragged.html()+'</li>');

                }
            });
        }
    };
});