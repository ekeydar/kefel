"use strict";
var app = angular.module('kefel_app');

app.controller('HistoryController',['$scope','$document','$location','UsersDB',
    function($scope,$document,$location,UsersDB) {
    	var scores = [];
    	var curUser = UsersDB.getCurUser();
    	var results = curUser.results || [];
    	var scores = [];
    	var dates = [];
    	results.forEach(function(r) {
    		scores.push(r.score);
    		var dt = new Date(r.timestamp);
    		var dtStr = '' + (dt.getMonth() + 1) + '/' + dt.getDate()
    		dates.push(dtStr);
    	});
    	console.log(scores);
    	$scope.histConfig = {
        	options: {
            	chart: {
                	type: 'line'
            	}
        	},
        	yAxis: {
          		title: {
                	text: 'ניקוד',
                },
                min: 0,
                max: 100,
            },
            xAxis: {
            	title: {
            		text: 'תאריך',
            	},
            	categories: dates,
        	},
        	series: [{
            	data: scores,
        	}],
        	title: {
            	text: 'ההיסטוריה שלי'
        	},
        	loading: false
    	}
    }
]);
