var app = angular.module('kefel_app', ['my.filters']);

app.controller('KefelController', ['$scope','$document',
function($scope,$document) {
    $scope.rows = [[7,8,9],
                   [4,5,6],
                   [1,2,3],
                   ["C",0,"B"]];
    $scope.input = {
        result: []
    }
    $scope.keyPress = function() {
        console.log("key press");
    }
    $scope.addDigit = function(d) {
        $scope.input.result.push(d);
    }
    $scope.backspace = function() {
        $scope.input.result.pop();
    }
    $scope.reset = function() {
        $scope.input.result = [];
    }
    $scope.submit = function() {
        console.log("submitted");
    }
    $document.on('keydown',function(ev) {
        $scope.$apply(function() {
            if (!isNaN(parseInt(ev.key))) {
                $scope.addDigit(ev.key);
            } else if (ev.keyCode == 8 || ev.keyCode == 46) {
                $scope.backspace();
            } else if (ev.keyCode == 27) {
                $scope.reset();
            } else if (ev.keyCode == 13) {
                $scope.submit();
            }
        });
    });
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
            $scope.backspace();
        } else if ($scope.isClear()) {
            $scope.reset();
        } else {
            $scope.addDigit($scope.key);
        }
    }
}]);


