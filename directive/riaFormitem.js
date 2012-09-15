
rialabs.directive('riaFormitem', function(){ 
	
	var template = '';
		template += '<div class="control-group">';
		template += '<label class="control-label" for="{{config.id}}">{{config.label}}</label>';
		template += '<div class="controls">';
		template += '<input type="{{config.input_type}}" id="{{config.id}}" placeholder="{{config.placeholder}}">';
		template += '</div>';
		template += '</div>';
	
	return {
		restrict: 'A',
		template: template,
		replace: true,
		link: function link ($scope, $element, $attrs){
			var ng = $scope;
			ng.config = ng[$attrs.riaFormitem];
		}
	};
	
})

.controller('CtrlForm', function($scope){ 
	
	var ng = $scope; 

	var init = function(){ /* Tudo o que é executado quando o script é carregado. */
		
		ng.nome_config = {
			id: 'txtNome',
			label: 'Seu nome',
			input_type: 'text',
			placeholder: 'informe seu nome completo...'
		};

		ng.email_config = {
			id: 'txtEmail',
			label: 'Seu e-mail',
			input_type: 'email',
			placeholder: 'informe um e-mail válido...'
		};
	}();

});