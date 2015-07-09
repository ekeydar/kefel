"use strict";
var app = angular.module('kefel_app');

app.controller('HistoryController',['$scope','$document','$location','UsersDB',
	function($scope,$document,$location,UsersDB) {
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
			avgTimes.push(r.timeForRight);
		});
		console.log(scores);
		$scope.histConfig = {
			options: {
				chart: {
					type: 'line'
				}
			},
        	yAxis: [
        		{ // Primary yAxis
        			title: {
        				text: 'ניקוד',
        				style: {
        					color: Highcharts.getOptions().colors[1]
        				}
        			}
        		}, 
        		{ // secondary yAxis
        			title: {
        				text: 'זמן שלאלה נכונה',
        				style: {
        					color: Highcharts.getOptions().colors[0]
        				}
        			},
        		},
        	],
        	series: [{
        		name: 'Rainfall',
        		data: scores,

        	}, {
        		name: 'Temperature',
        		data: avgTimes,
        	}],
			xAxis: {
				title: {
					text: 'תאריך',
				},
				categories: dates,
			},
			title: {
				text: 'ההיסטוריה שלי'
			},
			loading: false
		}
}
]);
