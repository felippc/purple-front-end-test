'use strict';


angular.module('frontEndApp')
	.controller('ListItensCtrl', ['$scope',
		function($scope) {
			$scope.itens = [
				{ topic: 'Escala', time: 10 },
			 	{ topic: 'Avalia', time: 15 },
			 	{ topic: 'Executa', time: 20 },
			 	{ topic: 'Planeja', time: 25 },
			 	{ topic: 'Seleciona', time: 30 },
			 	{ topic: 'Cria', time: 35 }
			];

			$scope.heySom = function (){
				console.log($scope.searchText);
			};
		}
	]);
