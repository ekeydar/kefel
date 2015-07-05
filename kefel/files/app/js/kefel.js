var app = angular.module('kefel_app', ['my.filters']);

app.controller('KefelController', ['$scope',
function($scope) {
    $scope.rows = [[7,8,9],
                   [4,5,6],
                   [1,2,3],
                   ["C",0,"B"]];
    $scope.input = {
        result: []
    }
}]);


app.controller('KeyController',['$scope',
function($scope) {
    $scope.isBack = function() {
        return $scope.key == 'B';
    }
    $scope.isClear = function() {
        return $scope.key == 'C';
    }
    $scope.clicked = function() {
        if ($scope.isBack()) {
            $scope.input.result.pop();
        } else if ($scope.isClear()) {
            $scope.input.result = [];
        } else {
            $scope.input.result.push($scope.key);
        }
    }
}]);


