describe('PowerTabCtrl', function() {

    beforeEach(module('powerTabber'));

    it('should return window with some tabs', inject(function($controller) {
            var scope = {},
                ctrl = $controller('PowerTabCtrl', {$scope:scope});
            expect(scope.windows.length).toBe(2);
    }));

});