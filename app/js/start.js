"use strict";
var app = angular.module('kefel_app');

app.controller('StartController',['$scope','$document','$location','UsersDB','KefelConfig',
    function($scope,$document,$location,UsersDB,KefelConfig) {
    	$scope.start = function() {
    		console.log('path = ' + $location.path());
    		$location.path("run");
    	}
    	$scope.config = KefelConfig;
    	$scope.UsersDB = UsersDB;
    }
]);

