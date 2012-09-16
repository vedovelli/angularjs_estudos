
/* De forma encadeada, executa-se o método directive para criar a diretiva. */
rialabs.directive('riaSelect', function(){ /* O uso no template será como atributo HTML: ria-select="{}" */
	/* http://docs.angularjs.org/guide/directive */
	return {
		restrict: 'A', /* Limita o uso a um atributo HTML */
		require: 'ngModel', /* Requisita o model associado ao elemento */
		compile: function(tElement, tAttrs){ /* compila function, que é onde transformamos o <select> em select2(). Não pode ser na link function. */
			
			var el = jQuery(tElement); /* O elemento recebido no construtor é um <select>, que com o uso da jQuery, será transformado em select2() */
				el.select2(); /* Aplica ao objeto jQuery o plugin select2() */
			
			return function ($scope, $element, $attrs, ngModel){ /* De dentro da compile function, retorna-se a link function */
				
				var ng = $scope;

				el.select2(ng[$attrs.riaSelect] || {}); /* Caso o objeto de configuração do select2() tenha sido passado, aplica-se ao elemento */
				
				el.on('change', function(){ /* Event listener no change do select2() */
					ng.$apply(function() { /* Executa a função anônima no escopo */
						ngModel.$setViewValue(el.select2('val')); /* Seta o valor do model com o valor do select2() */
					});
				});

				ngModel.$render = function() { /* O método render aplica o valor do model à view */
					el.select2('val', ngModel.$viewValue); /* Aplica o valor atual do model à view. Ação específica do plugin select2() */
				};

				setTimeout(function () { /* setTimeout como espécie de callLater, para o caso do model ja vir carregado */
					el.select2('val', ngModel.$viewValue);  /* Aplica o valor atual do model à view. Ação específica do plugin select2() */
				});
			}		
		}
	};
})

.controller('Ctrl', function($scope){ /* O controller associado à seção do template que contem os 2 selects */
	
	var ng = $scope; /* Atalhos para evitar ficar digitando $scope todo o tempo */

	ng.salvar = function(){ /* Alerta com o valor dos dois models. Este seria o momento de enviar a info para o server. */
		ng.result = JSON.stringify({cidade: ng.cidade, estado: ng.estado});
	};

	ng.load = function(){ /* Simula o carregamento de informações nos selects após uma consulta no DB, por ex. */
		ng.cidade = "BHZ";
		ng.estado = "MG";		
	};

	ng.reset = function(){ /* Limpa os dois models e reseta os dois selects */
		ng.cidade = "";
		ng.estado = "";		
	};
	
	var init = function(){ /* Tudo o que é executado quando o script é carregado. */

		ng.estados_config = {allowClear:true, placeholder:'Selecione um Estado'}; /* Objeto de configuração do select de Estados. Para saber mais, ver documentação do Select2: http://ivaynberg.github.com/select2/ */

		ng.estados = [ /* Data provider para o select de Estados. Numa situação real, os dados viriam do servidor. */
			{value: 'SP', name: 'São Paulo'},
			{value: 'MG', name: 'Minas Gerais'},
			{value: 'PR', name: 'Paraná'}
		];

		ng.cidades_config = {allowClear:true, placeholder:'Selecione uma Cidade'}; /* Objeto de configuração do select de Cidades. Para saber mais, ver documentação do Select2: http://ivaynberg.github.com/select2/ */

		ng.cidades = [ /* Data provider para o select de Cidades. Numa situação real, os dados viriam do servidor. */
			{value: 'SPO', name: 'São Paulo'},
			{value: 'BHZ', name: 'Belo Horizonte'},
			{value: 'CWB', name: 'Curitiba'}
		];

 		/* Seta o valor inicial dos models dos selects */
		ng.cidade = "CWB";
		ng.estado = "PR";

	}(); /* Executa o método init() imediatamente */
});