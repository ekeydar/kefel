"use strict";
var app = angular.module('kefel_app', ['ui.bootstrap',
  'highcharts-ng',
  'my.services',
  'my.filters',
  'ngRoute']);


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/start', {
        templateUrl: 'app/tpls/start.html',
        controller: 'StartController'
      }).
      when('/run', {
        templateUrl: 'app/tpls/kefel.html',
        controller: 'KefelController'
      }).
      when('/users', {
        templateUrl: 'app/tpls/users.html',
        controller: 'UsersController',
      }).
      when('/history',{
        templateUrl: 'app/tpls/history.html',
        controller: 'HistoryController',
      }).
      when('/',{
        redirectTo: '/start',
      }).
      otherwise({
        redirectTo: 'start'
      });
  }]);

app.controller('NavController', ['$scope','$document','UsersDB',
    function($scope,$document,UsersDB) {
      $scope.UsersDB = UsersDB;
    }
]);
