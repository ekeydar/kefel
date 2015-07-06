var app = angular.module('kefel_app', ['my.filters']);

function Question(index) {
    Question.prototype.genNum = function() {
	return Math.ceil(Math.random(1)*10)
    }
    Question.prototype.NOTASKED = 0;
    Question.prototype.RIGHT = 1;
    Question.prototype.WRONG = 2;
    this.num1 = this.genNum();
    this.num2 = this.genNum();
    this.answerLength = (this.num1*this.num2).toString().length;
    this.index = index;
    this.status = this.NOTASKED;
    this.input = [];
    Question.prototype.pushToInput = function(i) {
        if (this.input.length < this.answerLength) {
            this.input.push(i);
        }
    }
    Question.prototype.popInput = function() {
        if (this.input.length > 0) {
            this.input.pop();
        }
    }
    Question.prototype.resetInput = function() {
        this.input = [];
    }
}

app.controller('KefelController', ['$scope','$document',
function($scope,$document) {
    $scope.rows = [[7,8,9],
                   [4,5,6],
                   [1,2,3],
                   ["C",0,"B"]];

    $scope.questions = [];
    $scope.curQuestion = null;
    for (var i = 0 ; i < 10 ; i++) {
	    $scope.questions.push(new Question(i));
    }
    $scope.curQuestion = $scope.questions[0];
    $scope.input = {
        result: []
    }
    $scope.addDigit = function(d) {
        if ($scope.curQuestion) {
            $scope.curQuestion.pushToInput(d);
        }
    }
    $scope.backspace = function() {
        if ($scope.curQuestion) {
            $scope.curQuestion.popInput();
        }
    }
    $scope.reset = function() {
        if ($scope.curQuestion) {
            $scope.curQuestion.resetInput();
        }
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


