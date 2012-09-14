
rialabs.directive('riaSsslider', function(){ 
	return {
		restrict: 'A',
		link: function link ($scope, $element, $attrs){
			var el = jQuery($element);
			
			el.children().each(function(index){
				$scope.panes_length.push(index);
			});
			
			$scope.$watch('position', function(newValue){
				el.ssslider('navigate',newValue);
			});

			$scope.$watch('prev', function(){
				el.ssslider('prev');
			});

			$scope.$watch('next', function(){
				el.ssslider('next');
			});
			
			el.ssslider();
		}
	};
})

.controller('CtrlSlider', function($scope){ 
	
	var ng = $scope; 

	ng.navegar = function(pos){
		ng.position = pos;
	};

	ng.change_prev = function(){
		ng.prev = !ng.prev || false;
	};

	ng.change_next = function(){
		ng.next = !ng.next || false;
	};

	var init = function(){ /* Tudo o que é executado quando o script é carregado. */
		ng.position = 0;
		ng.panes_length = [];
	}();

});