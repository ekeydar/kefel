"use strict";
var app = angular.module('kefel_app');

app.controller('StartController', ['$scope', '$document', '$location', 'UsersDB', 'KefelConfig','$routeParams',
    function ($scope, $document, $location, UsersDB, KefelConfig, $routeParams) {
        $scope.config = KefelConfig;
        $scope.UsersDB = UsersDB;
        if ($routeParams.kind) {
            $scope.config.setKind($routeParams.kind);
            $scope.UsersDB.setLastGame($scope.config.kind.code);
        };
        $scope.start = function () {
            $location.path("run/");
        }
    }
]);

