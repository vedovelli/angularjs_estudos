
rialabs.directive('riaSsslider', function(){ 
	return {
		restrict: 'A',
		link: function link ($scope, $element, $attrs){
			var el = jQuery($element),
				ng = $scope;
			
			el.children().each(function(index, item){
				ng.panes_length.push($(item).data('label') || "");
			});
			
			ng.$watch('position', function(newValue){
				el.ssslider('navigate',newValue);
			});

			ng.$watch('prev', function(newValue){
				if(newValue != undefined){
					el.ssslider('prev');
				}
			});

			ng.$watch('next', function(newValue){
				if(newValue != undefined){
					el.ssslider('next');
				}
			});
			
			el.ssslider(ng.config || {});
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
		ng.config = {
			orientation:'from_right'
		};
	}();

});