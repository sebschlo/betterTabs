'use strict';

/* Services */

var powerTabServices = angular.module('powerTabServices', ['ngResource']);

// Interacting with Chrome Information
powerTabServices.factory('chromeService', function() {
    var windows = null;
    chrome.windows.getAll({"populate": true}, function(wins) {
        console.log(wins);
        windows = wins;
    });

    var tabs = null;
    chrome.tabs.query({}, function(tbs) {
        console.log(tbs);
        tabs = tbs;
    });

    var chromeInfo = {
        windows: windows,
        tabs: tabs
    };

    return chromeInfo;
});




// ScreenShots obtained from public API
powerTabServices.factory('ScreenShot', ['$resource',
    function($resource){
        return $resource('phones/:phoneId.json', {}, {
            query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
        });
    }]);



// User service used for localStorage
powerTabServices.factory('UserService', function() {
    var defaults = {
        location: 'autoip'
    };
    var service = {
        user: {},
        save: function() {
            sessionStorage.powerTabber =
                angular.toJson(service.user);
        },
        restore: function() {
            // pull from sessionStorage
            service.user =
                angular.fromJson(sessionStorage.powerTabber) || defaults

            return service.user;
        }
    };
    service.restore();
    return service;
});