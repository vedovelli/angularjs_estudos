
rialabs.directive('riaFormitem', function($compile){ 

	return {
		restrict: 'A',
		require: 'ngModel',
		compile: function(tElem, tAttrs){

			return function ($scope, $element, $attrs, $model){

				var ng = $scope;

				ng.$watch($attrs.riaFormitem, function(newValue){

					if(newValue){

						ng.config = newValue;

						var template = '';
							template += '<div class="control-group">';
							template += '<label class="control-label" for="'+ng.config.id+'">'+ng.config.label+'</label>';
							template += '<div class="controls">';
							template += '<input ng-model="'+$attrs.ngModel+'" type="'+ng.config.input_type+'" '+ng.config.required+' id="'+ng.config.id+'" placeholder="'+ng.config.placeholder+'">';
							template += '</div>';
							template += '</div>';
						
						$element.replaceWith($compile(template)($scope));


					} else {
						$.error('Config object is mandatory!');
					}

				});
				
				ng.$watch($attrs.ngModel, function(){
					ng.$emit('model_changed', {person:'Mark',age:'37'});
				});
			}
		}
	};

})

.controller('CtrlForm', function($scope){ 
	
	var ng = $scope;

	ng.submit = function(){
		ng.name = '';
		ng.email = '';
	};

	ng.change = function(model, value){
		ng[model] = value;
	};

	ng.result = function(){
		ng.result = JSON.stringify({nome: ng.name, email: ng.email});
	};

	var init = function(){ /* Tudo o que é executado quando o script é carregado. */
		
		ng.name = 'Mark Pilgrim';
		ng.email = 'mp@gmail.com';

		ng.name_config = {
			id: 'txtNome',
			label: 'Your name',
			input_type: 'text',
			placeholder: 'full name please...',
			required: 'required'
		};

		ng.email_config = {
			id: 'txtEmail',
			label: 'Your e-mail',
			input_type: 'text',
			placeholder: 'valid e-mail address...',
			required: ''
		};

		ng.$on('model_changed', function(ev, args){
			ng.result = JSON.stringify({name: ng.name, email: ng.email});
		});

	}();

});