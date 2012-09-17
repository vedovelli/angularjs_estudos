
/* De forma encadeada, executa-se o método directive para criar a diretiva. */
rialabs.directive('riaSelect', function(){ /* O uso no template será como atributo HTML: ria-select="{}" */
	/* http://docs.angularjs.org/guide/directive */
	return {
		restrict: 'A', /* Limita o uso a um atributo HTML */
		require: 'ngModel', /* Requisita o model associado ao elemento */
		compile: function(tElement, tAttrs){ /* compila function, que é onde transformamos o <select> em select2(). Não pode ser na link function. */
			
			var el = jQuery(tElement); /* O elemento recebido no construtor é um <select>, que com o uso da jQuery, será transformado em select2() */
				el.select2(); /* Aplica ao objeto jQuery o plugin select2() */
			
			return function ($scope, $element, $attrs, $model){ /* De dentro da compile function, retorna-se a link function */
				
				var ng = $scope;

				el.select2(ng[$attrs.riaSelect] || {}); /* Caso o objeto de configuração do select2() tenha sido passado, aplica-se ao elemento */
				
				el.on('change', function(){ /* Event listener no change do select2() */
					ng.$apply(function() { /* Executa a função anônima no escopo */
						$model.$setViewValue(el.select2('val')); /* Seta o valor do model com o valor do select2() */
					});
				});

				ng.$watch($attrs.ngModel, function(newValue){
					el.select2('val', $model.$viewValue);  /* Aplica o valor atual do model à view. Ação específica do plugin select2() */
					ng.$emit('model_changed');
				});

				setTimeout(function () { /* setTimeout como espécie de callLater, para o caso do model ja vir carregado */
					el.select2('val', $model.$viewValue);  /* Aplica o valor atual do model à view. Ação específica do plugin select2() */
				});

			}		
		}
	};
})

.controller('Ctrl', function($scope){ /* O controller associado à seção do template que contem os 2 selects */
	
	var ng = $scope; /* Atalhos para evitar ficar digitando $scope todo o tempo */

	ng.save = function(){ /* Alerta com o valor dos dois models. Este seria o momento de enviar a info para o server. */
		ng.reset();
	};

	ng.load = function(){ /* Simula o carregamento de informações nos selects após uma consulta no DB, por ex. */
		ng.city = "Chicago";
		ng.state = "Illinois";		
	};

	ng.reset = function(){ /* Limpa os dois models e reseta os dois selects */
		ng.city = "";
		ng.state = "";		
	};
	
	var init = function(){ /* Tudo o que é executado quando o script é carregado. */

		ng.states_config = {allowClear:true, placeholder:'Select a state'}; /* Objeto de configuração do select de Estados. Para saber mais, ver documentação do Select2: http://ivaynberg.github.com/select2/ */

		ng.states = [ /* Data provider para o select de Estados. Numa situação real, os dados viriam do servidor. */
			{value: 'Illinois', name: 'Illinois'},
			{value: 'Mississippi', name: 'Mississippi'},
			{value: 'Arkansas', name: 'Arkansas'}
		];

		ng.cities_config = {allowClear:true, placeholder:'Select a city'}; /* Objeto de configuração do select de Cidades. Para saber mais, ver documentação do Select2: http://ivaynberg.github.com/select2/ */

		ng.cities = [ /* Data provider para o select de Cidades. Numa situação real, os dados viriam do servidor. */
			{value: 'Brookhaven', name: 'Brookhaven'},
			{value: 'Chicago', name: 'Chicago'},
			{value: 'Fayetteville', name: 'Fayetteville'}
		];

 		/* Seta o valor inicial dos models dos selects */
		ng.city = "Fayetteville";
		ng.state = "Arkansas";

		ng.$on('model_changed', function(){
			ng.result = JSON.stringify({city: ng.city, state: ng.state});
		});

	}(); /* Executa o método init() imediatamente */
});