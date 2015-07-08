var app = angular.module('kefel_app');

app.controller('UsersController', ['$scope','$document','$location',
	function($scope,$document,$location) {

	}
]);

app.controller('UserRowController',['$scope','$document','$location',
	function($scope,$document,$location) {
		$scope.clicked = function() {
			console.log("user " + $scope.user.name + " clicked");
			$scope.switchUser($scope.user);
			$location.path("/run");
		}
	}
]);
