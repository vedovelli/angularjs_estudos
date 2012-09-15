var myAppModule = angular.module("myApp", []);

myAppModule.directive('myDropdownB', function($compile) {
    return {
        restrict: "E",
        priority: 1000,
        terminal: true,
        compile: function(tElement, tAttrs, transclude) {

            var tplEl = angular.element('<select></select>');
            tplEl.attr("ng-options", "i.id as i.name for i in foodB");

            for(attr in tAttrs.$attr) {
                tplEl.attr(tAttrs.$attr[attr], tAttrs[attr]);
            }
            
            
            return function(scope, element, attrs) {

                var compiledEl = $compile(tplEl)(scope);
                element.replaceWith(compiledEl);
            }
        },
        controller: ['$scope', '$attrs', function($scope, $attrs) {
            $scope.foodB = [{
                id: '1',
                name: 'Apple'},
            {
                id: '2',
                name: 'Rice'},
            {
                id: '3',
                name: 'Banana'}];}]
    };
});


var MyCtrl = function($scope) {}​