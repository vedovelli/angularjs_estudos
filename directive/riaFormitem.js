
rialabs.directive('riaFormitem', function($compile){ 

	return {
		restrict: 'A',
		require: 'ngModel',
		compile: function(tElem, tAttrs){

			return function ($scope, $element, $attrs, $model){

				var ng = $scope,
					tEl, 
					input;

				
				ng.$watch($attrs.riaFormitem, function(newValue){

					if(newValue){

						ng.config = newValue;

						// falta validar a presença de propriedades obrigatorias
						// do objeto de config

						var template = '';
							template += '<div class="control-group">';
							template += '<label class="control-label" for="'+ng.config.id+'">'+ng.config.label+'</label>';
							template += '<div class="controls">';
							template += '<input ng-model="'+$attrs.ngModel+'" type="'+ng.config.input_type+'" '+ng.config.required+' id="'+ng.config.id+'" placeholder="'+ng.config.placeholder+'">';
							template += '</div>';
							template += '</div>';
						
						var compiled_template = $compile(template)($scope);

						$element.replaceWith(compiled_template);
						input = $(compiled_template.find('input'));

						input.on('keyup', function(){
							$model.$setViewValue(input.val());
						});

						ng.$watch(ng.config.model, function(){
							input.val($model.$viewValue);
						});

					} else {
						$.error('O objeto de configuração é obrigatório!');
					}

				});

			}
		}
	};

})

.controller('CtrlForm', function($scope){ 
	
	var ng = $scope; 

	ng.submit = function(){
		console.log(JSON.stringify({nome: ng.nome, email: ng.email}));
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

	}();

});