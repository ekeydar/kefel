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
      when('/users', {
        templateUrl: 'app/tpls/users.html',
        controller: 'UsersController',
      }).
      when('/',{
        redirectTo: '/start',
      }).
      otherwise({
        redirectTo: 'start'
      });
  }]);

app.controller('GlobalController', ['$scope','$document',
    function($scope,$document) {
      var names = ['ערן','יובל','עדו','רתם']
      $scope.allUsers = [];
      names.forEach(function(n) {
        $scope.allUsers.push({'name': n});
      });
      $scope.curUser = $scope.allUsers[0];
      $scope.switchUser = function(user) {
        $scope.curUser = user;
      }
}]);
