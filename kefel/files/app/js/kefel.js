var app = angular.module('kefel_app', []);

app.controller('KefelController', ['$scope',
function($scope) {
    $scope.rows = [[7,8,9],
                   [4,5,6],
                   [1,2,3],
                   ["C",0,"B"]];
}]);


app.controller('KeyController',['$scope',
function($scope) {

}]);


