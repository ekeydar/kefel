var app = angular.module('kefel_app');

app.controller('StartController',['$scope','$document','$location',
    function($scope,$document,$location) {
    	$scope.start = function() {
    		console.log('path = ' + $location.path());
    		$location.path("run");
    	}
    }
]);

