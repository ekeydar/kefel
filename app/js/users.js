"use strict";
var app = angular.module('kefel_app');

app.controller('UsersController', ['$scope','$document','$location','UsersDB',
	function($scope,$document,$location,UsersDB) {
		$scope.UsersDB = UsersDB;
		$scope.addNewUser = function() {
			var name = $scope.input.newUserName;
			console.log(name);
		}
	}
]);

app.controller('UserRowController',['$scope','$document','$location','UsersDB',
	function($scope,$document,$location,UsersDB) {
		$scope.clicked = function() {
			console.log("user " + $scope.user.name + " clicked");
			UsersDB.switchUser($scope.user);
			$location.path("/start");
		}
	}
]);
