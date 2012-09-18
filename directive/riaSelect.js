
rialabs.directive('riaSelect', function(){ /* This direct will be used as an HTML attribute: ria-select="{}" */
	/* http://docs.angularjs.org/guide/directive */
	return {
		restrict: 'A', /* Limitates the use as an HTML attrbute */
		require: 'ngModel', /* Requires the model to be used in this directive */
		compile: function(tElement, tAttrs){ /* In the compile function, the <select> element is transformed by the plugin. */
			
			var el = jQuery(tElement); /* tElement is a plain <select> */
				el.select2(); /* Uses the plugin select2() */
			
			return function ($scope, $element, $attrs, $model){ /* From within compile function, the link function is returned */
				
				var ng = $scope; /* this is just a shortcut to avoid type $scope all the time */

				el.select2(ng[$attrs.riaSelect] || {}); /* If a config object was passed, apply it. Otherwise, apply just an empty object */
				
				el.on('change', function(){ /* Event listener for change on select2() */
					ng.$apply(function() { /* Executes an anonymous function on $scope and triggers the notification process */
						$model.$setViewValue(el.select2('val')); /* Applies the model value to select2() */
					});
				});

				/* IMPORTANT: this is necessary because the plugin Select2() hides the base <select> and shows
				 * a new set o HTML tags in order to achieve its visual goal. 
				 * So, if we change the model value, it will be applied to the
				 * hidden <select> and not to what you see.
				 */
				ng.$watch($attrs.ngModel, function(newValue){ /* Watch for changes in the model */
					el.select2('val', $model.$viewValue);  /* Applies the model value to Select2 */
					ng.$emit('model_changed'); /* Triggers an event that will be helpful if you want to do something specific in the controller. */
				});

				setTimeout(function () { /* Act as a call later function. This was the only way to get the initial values set on page loading. */
					el.select2('val', $model.$viewValue);  /* Applies the model value to Select2 */
				});

			}		
		}
	};
})

/* This is the controller that manages the behaviour. Note that no DOM
 * manipulation is being made here, just data manipulation. Based on this,
 * the directive can set the appearance and values in the view, since it 
 * holds an instance of the controller.
 */
.controller('Ctrl', function($scope){ 
	
	var ng = $scope; 

	ng.save = function(){ 
		ng.reset();
	};

	ng.load = function(){ 
		ng.city = "Chicago";
		ng.state = "Illinois";		
	};

	ng.reset = function(){ 
		ng.city = "";
		ng.state = "";		
	};
	
	var init = function(){ 

		ng.states_config = {allowClear:true, placeholder:'Select a state'}; 

		ng.states = [ 
			{value: 'Illinois', name: 'Illinois'},
			{value: 'Mississippi', name: 'Mississippi'},
			{value: 'Arkansas', name: 'Arkansas'}
		];

		ng.cities_config = {allowClear:true, placeholder:'Select a city'}; 

		ng.cities = [ 
			{value: 'Brookhaven', name: 'Brookhaven'},
			{value: 'Chicago', name: 'Chicago'},
			{value: 'Fayetteville', name: 'Fayetteville'}
		];

 		ng.city = "Fayetteville";
		ng.state = "Arkansas";

		ng.$on('model_changed', function(){
			ng.result = JSON.stringify({city: ng.city, state: ng.state});
		});

	}();
});