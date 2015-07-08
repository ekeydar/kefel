var app = angular.module('kefel_app', ['my.filters','ngRoute']);


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
      when('/',{
        redirectTo: '/start',
      }).
      otherwise({
        redirectTo: 'start'
      });
  }]);

app.controller('NavController', ['$scope','$document',
    function($scope,$document) {
}]);
