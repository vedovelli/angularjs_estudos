
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
						$.error('O objeto de configuração é obrigatório!');
					}

				});
				
				ng.$watch($attrs.ngModel, function(){
					ng.$emit('model_changed', {person:'vedovelli',age:'37'});
				});
			}
		}
	};

})

.controller('CtrlForm', function($scope){ 
	
	var ng = $scope;

	ng.submit = function(){
		ng.nome = '';
		ng.email = '';
	};

	ng.trocar = function(model, valor){
		ng[model] = valor;
	};

	ng.result = function(){
		ng.result = JSON.stringify({nome: ng.nome, email: ng.email});
	};

	var init = function(){ /* Tudo o que é executado quando o script é carregado. */
		
		ng.nome = 'Fábio Augusto da Silva Vedovelli';
		ng.email = 'vedovelli@gmail.com';

		ng.nome_config = {
			id: 'txtNome',
			label: 'Seu nome',
			input_type: 'text',
			placeholder: 'informe seu nome completo...',
			required: 'required'
		};

		ng.email_config = {
			id: 'txtEmail',
			label: 'Seu e-mail',
			input_type: 'text',
			placeholder: 'informe um e-mail válido...',
			required: ''
		};

		ng.$on('model_changed', function(ev, args){
			ng.result = JSON.stringify({nome: ng.nome, email: ng.email});
		});

	}();

});