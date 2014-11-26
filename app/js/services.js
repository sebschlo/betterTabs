'use strict';

/* Services */

var powerTabServices = angular.module('powerTabServices', ['ngResource']);

powerTabServices.factory('ScreenShot', ['$resource',
    function($resource){
        return $resource('phones/:phoneId.json', {}, {
            query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
        });
    }]);