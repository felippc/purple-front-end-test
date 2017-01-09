'use strict';


angular.module('frontEndApp')
	.controller('LoginCtrl', ['$scope', '$uibModal', '$document',
		function($scope, $uibModal, $document) {

			$scope.open = function _openLoginModal(size, parentSelector) {
				var parentElem = parentSelector ?
					angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
				$uibModal.open({
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

			};

			$scope.open();
		}
	]);

angular.module('frontEndApp').controller('ModalInstanceCtrl', function($uibModalInstance, $scope, $location) {

	$scope.alerts = [];

	$scope.closeAlert = function _closeAlert(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.addAlert = function _addAlert() {
    $scope.alerts.push({msg: 'Error: invalid user/password.'});
  };

	var isLoginValid = function _validateLogin() {
		return $scope.user === 'admin' && $scope.pass === 'admin';
	};

	$scope.doLogin = function _doLogin() {
		if (isLoginValid()) {
			$scope.dismiss();
			$location.url('/list-itens');
		} else {
			$scope.addAlert();
		}
	};

	$scope.close = function() {
		$uibModalInstance.close();
	};

	$scope.dismiss = function() {
		$uibModalInstance.dismiss('cancel');
	};
});