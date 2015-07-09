"use strict";
var app = angular.module('kefel_app');

app.controller('StartController',['$scope','$document','$location','UsersDB',
    function($scope,$document,$location,UsersDB) {
    	$scope.start = function() {
    		console.log('path = ' + $location.path());
    		$location.path("run");
    	}
    	$scope.UsersDB = UsersDB;
    }
]);

