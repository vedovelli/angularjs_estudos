
rialabs.directive('riaFormitem', function(){ 

	var template = '';
		template += '<div class="control-group">';
		template += '<label class="control-label" for="{{config.id}}">{{config.label}}</label>';
		template += '<div class="controls">';
		template += '<input type="{{config.input_type}}" {{config.required}} id="{{config.id}}" placeholder="{{config.placeholder}}">';
		template += '</div>';
		template += '</div>';

	return {
		restrict: 'A',
		template: template,
		replace: true,
		link: function ($scope, $element, $attrs){
			
			var ng = $scope, 
				el = jQuery($element),
				input = el.find('input');

			ng.$watch($attrs.riaFormitem, function(newValue){
				ng.config = newValue;
				ng.$watch(ng.config.model, function(){
					input.val(ng[ng.config.model]);
				});
			});

			input.on('keyup', function(){
				// $model.$setViewValue(input.val());
				ng[ng.config.model] = input.val();
				console.log(ng[ng.config.model], 'input keyup event');
			});

		}
	};

})

.controller('CtrlForm', function($scope){ 
	
	var ng = $scope; 

	ng.mudar = function(){
		console.log('mudar()', ng.nome);
	};

	var init = function(){ /* Tudo o que é executado quando o script é carregado. */
		
		ng.nome = 'ana paula';

		ng.nome_config = {
			id: 'txtNome',
			label: 'Seu nome',
			input_type: 'text',
			placeholder: 'informe seu nome completo...',
			model: 'nome',
			required: 'required'
		};

		ng.email_config = {
			id: 'txtEmail',
			label: 'Seu e-mail',
			input_type: 'email',
			placeholder: 'informe um e-mail válido...',
			model: 'email',
			required: ''
		};
	}();

});