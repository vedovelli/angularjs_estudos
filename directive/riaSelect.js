var rialabs = angular.module('rialabs', [])

.directive('riaSelect', function(){
	return {
		restrict: 'A',
		require: 'ngModel',
		compile: function(tElement, tAttrs){
			var el = jQuery(tElement);
				el.select2();
			return function ($scope, $element, $attrs, ngModel){
				
				el.select2($scope[$attrs.riaSelect] || {});
				
				el.on('change', function(){
					$scope.$apply(function() {
						ngModel.$setViewValue(el.select2('val'));
					});
				});

				ngModel.$render = function() {
					el.select2('val', ngModel.$viewValue);
				};

				setTimeout(function () {
					el.select2('val', ngModel.$viewValue);
				});
			}		
		}
	};
})

.controller('Ctrl', function($scope){
	
	var ng = $scope;

	ng.salvar = function(){
		alert(JSON.stringify({cidade: ng.cidade, estado: ng.estado}));
	};

	ng.load = function(){
		ng.cidade = "BHZ";
		ng.estado = "MG";		
	};

	ng.reset = function(){
		ng.cidade = "";
		ng.estado = "";		
	};
	
	var init = function(){

		ng.estados_config = {allowClear:true, placeholder:'Selecione um Estado'};

		ng.estados = [
			{value: 'SP', name: 'São Paulo'},
			{value: 'MG', name: 'Minas Gerais'},
			{value: 'PR', name: 'Paraná'}
		];

		ng.cidades_config = {allowClear:true, placeholder:'Selecione uma Cidade'};

		ng.cidades = [
			{value: 'SPO', name: 'São Paulo'},
			{value: 'BHZ', name: 'Belo Horizonte'},
			{value: 'CWB', name: 'Curitiba'}
		];

		ng.cidade = "CWB";
		ng.estado = "PR";

	}();
});