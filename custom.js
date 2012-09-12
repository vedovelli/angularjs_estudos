var rialabs = angular.module('rialabs', [])

.directive('riaMask', function(){
	return {
		restrict: 'A',
		link: function ($scope, $element, $attrs){
			jQuery($element).mask($attrs.riaMask);
		}
	};
})

.controller('Ctrl', function($scope){
	var ng = $scope;
	ng.alterar = function(){
		console.log(ng.cep);
	};
});