"use strict";
var app = angular.module('kefel_app');

app.controller('HistoryController',['$scope','$document','$location','UsersDB',
	function($scope,$document,$location,UsersDB) {
		$scope.frac2 =  function(num) {
			return Math.ceil(num*100) / 100;
		}
		$scope.curUser = UsersDB.getCurUser();
		$scope.results = UsersDB.getCurUserResults();
		var scores = [];
		var avgTimes = [];
		var dates = [];
		$scope.results.forEach(function(r) {
			scores.push(r.score);
			var dt = new Date(r.timestamp);
			var dtStr = '' + (dt.getMonth() + 1) + '/' + dt.getDate()
			dates.push(dtStr);
			avgTimes.push($scope.frac2(r.timeForRight));
		});
		$scope.histConfig = {
			chart: {
				zoomType: 'xy'
			},
			title: {
				text: 'ההיסטוריה שלי'
			},
			subtitle: {
				text: UsersDB.getCurUserName(),
			},
			xAxis: [{
				categories: dates,
				crosshair: true
			}],
        	yAxis: [{ // Primary yAxis
	        	labels: {
	        		style: {
	        			color: Highcharts.getOptions().colors[1]
	        		}
	        	},
	        	title: {
	        		text: 'ניקוד',
	        		style: {
	        			color: Highcharts.getOptions().colors[1]
	        		}
	        	}
        	}, { // Secondary yAxis
        		title: {
        			text: 'זמן לתשובה נכונה',
	        		style: {
	        			color: Highcharts.getOptions().colors[0]
	        		}
        		},
        		labels: {
	        		style: {
	        			color: Highcharts.getOptions().colors[0]
	        		}
        		},
        		opposite: true
        	}],
        	tooltip: {
        		shared: true
        	},
	        legend: {
	        	enabled: false,
	        },
	        series: [{
	        	name: 'זמן לתשובה נכונה',
	        	type: 'column',
	        	yAxis: 1,
	        	data: avgTimes,
	        	tooltip: {
	        		valueSuffix: ' שניות'
	        	}

	        }, {
	        	name: 'ניקוד',
	        	type: 'spline',
	        	data: scores,
	        	tooltip: {
	        	}
	        }]
    	}
    	$scope.restart = function() {
    		$location.path("/run");
    	}
	}]);
