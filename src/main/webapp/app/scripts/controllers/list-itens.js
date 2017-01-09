'use strict';


angular.module('frontEndApp')
	.controller('ListItensCtrl', ['$scope',
		function($scope) {

			$scope.itensList = ['Escala', 'Avalia', 'Executa', 'Planeja', 'Seleciona', 'Cria'];

		}
	]);
