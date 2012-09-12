var rialabs = angular.module('rialabs', [])

.directive('riaSelect', function(){
	return {
		restrict: 'A',
		compile: function(tElement, tAttrs){
			var el = jQuery(tElement);
				el.select2();
			return function ($scope, $element, $attrs){
				el.select2($scope[$attrs.riaSelect] || {});
				el.on('change', function(){
					$scope[$attrs.ngModel] = el.select2('val');
				});
			}		
		}
	};
})

.controller('Ctrl', function($scope){
	
	var ng = $scope;
	
	var init = function(){

		ng.estado = "";
		ng.cidade = "";

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

	}();
});