'use strict';


angular.module('frontEndApp')
	.controller('LoginCtrl', ['$scope', '$uibModal', '$document',
		function($scope, $uibModal, $document) {

			$scope.open = function(size, parentSelector) {
				var parentElem = parentSelector ?
					angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
				var modalInstance = $uibModal.open({
					animation: true,
					ariaLabelledBy: 'modal-title',
					ariaDescribedBy: 'modal-body',
					templateUrl: 'myModalContent.html',
					controller: 'ModalInstanceCtrl',
					controllerAs: '$scope',
					size: size,
					appendTo: parentElem,
					backdrop: false,
					windowClass: 'login-modal'
					// resolve: {
					// 	items: function() {
					// 		return $ctrl.items;
					// 	}
					// }
				});

				modalInstance.result.then(function(selectedItem) {
					$scope.selected = selectedItem;
				}, function() {
					console.log('Modal dismissed at: ' + new Date());
				});
			};

			$scope.open();
		}
	]);

angular.module('frontEndApp').controller('ModalInstanceCtrl', function($uibModalInstance, $scope) {

	$scope.close = function() {
		$uibModalInstance.close();
	};

	$scope.dismiss = function() {
		$uibModalInstance.dismiss('cancel');
	};
});