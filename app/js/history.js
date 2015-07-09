"use strict";
var app = angular.module('kefel_app');

app.controller('HistoryController',['$scope','$document','$location','UsersDB',
	function($scope,$document,$location,UsersDB) {
		$scope.frac2 =  function(num) {
			return Math.ceil(num*100) / 100;
		}
		var scores = [];
		var curUser = UsersDB.getCurUser();
		var results = curUser.results || [];
		var scores = [];
		var avgTimes = [];
		var dates = [];
		results.forEach(function(r) {
			scores.push(r.score);
			var dt = new Date(r.timestamp);
			var dtStr = '' + (dt.getMonth() + 1) + '/' + dt.getDate()
			dates.push(dtStr);
			avgTimes.push($scope.frac2(r.timeForRight));
		});
		console.log(scores);
		$scope.histConfig = {
			chart: {
            	zoomType: 'xy'
        	},
			legend: {
            	layout: 'vertical',
            	align: 'left',
            	x: 120,
            	verticalAlign: 'top',
            	y: 100,
            	floating: false,
            	backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        	},
        	yAxis: [
        		{ 
        			title: {
        				text: 'ניקוד',
        				style: {
        					color: Highcharts.getOptions().colors[1]
        				}
        			}
        		}, 
        		{ // secondary yAxis
        			title: {
        				text: 'זמן לתשובה נכונה',
        				style: {
        					color: Highcharts.getOptions().colors[0]
        				}
        			},
        			opposite: true,
        		},
        	],
        	tooltip: {
          	  	shared: true
        	},
        	series: [{
        		name: 'ניקוד',
        		data: scores,
        		min: 0,
        		max: 100,

        	}, {
        		name: 'זמן לתשובה נכונה',
        		data: avgTimes,
        		yAxis: 1,
        	}],
			xAxis: {
				title: {
					text: 'תאריך',
				},
				categories: dates,
				crosshair: true,
			},
			title: {
				text: 'ההיסטוריה שלי'
			},
			loading: false
		}
}
]);
