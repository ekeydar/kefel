"use strict";
var app = angular.module('kefel_app');

app.controller('UsersController', ['$scope','$document','$location','UsersDB',
	function($scope,$document,$location,UsersDB) {
		$scope.UsersDB = UsersDB;
		$scope.badNewUserErrror = null;
		$scope.addNewUser = function() {
			var name = $scope.input.newUserName;
			if (UsersDB.isLegalNewUser(name)) {
				UsersDB.addNewUser(name);
				$location.path('/start');
			} else {
				$scope.badNewUserErrror = 'השם ' + name + ' כבר תפוס, אנא בחרו שם אחר'
			}
		}
	}
]);

app.controller('UserRowController',['$scope','$document','$location','UsersDB',
	function($scope,$document,$location,UsersDB) {
		$scope.clicked = function() {
			UsersDB.switchUser($scope.user);
			$location.path("/start");
		}
	}
]);
