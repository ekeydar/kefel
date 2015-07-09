//services.js
var app = angular.module('kefel_app');

app.controller('KefelController', ['$scope','$document','$filter','UsersDB',
function($scope,$document,$filter,UsersDB) {
    function Question(index) {
        Question.prototype.genNum = function() {
            return 1+Math.floor(Math.random()*10);
        }
        Question.prototype.NOTASKED = 0;
        Question.prototype.RIGHT = 1;
        Question.prototype.WRONG = 2;
        this.index = index;
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
        Question.prototype.check = function() {
            this.endTime = new Date().getTime();
            this.totalTime = this.endTime - this.startTime;
            var userAnswer = parseInt($filter('joinList')(this.input));
            if (userAnswer == this.num1*this.num2) {
                this.status = this.RIGHT;
            } else {
                this.status = this.WRONG;
            }
        }
        Question.prototype.start = function() {
            this.startTime = new Date().getTime();
        }
    }

    $scope.getCount = function() {
        return $scope.questions.length;
    }

    $scope.getRightCount = function() {
        var rightCount = 0;
        $scope.questions.forEach(function(q) {
            if (q.status == q.RIGHT) {
                rightCount++;
            }
        });
        return rightCount;
    }

    $scope.getTotalTime = function() {
        var result = 0.0;
        $scope.questions.forEach(function(q) {
            result+=q.totalTime;
        }); 
        return result / 1000.0;
    }

    $scope.getTotalRightTime = function() {
        var result = 0.0;
        $scope.questions.forEach(function(q) {
            if (q.status == q.RIGHT) {
                result+=q.totalTime;    
            }
        }); 
        return result / 1000.0;
    }

    $scope.getTimeForRight = function() {
        var rc = $scope.getRightCount();
        if (rc > 0) { 
            return $scope.getTotalRightTime() / rc;
        } else {
            return '';
        }
    }

    $scope.getScore = function() {
        return Math.ceil(100 * $scope.getRightCount() /$scope.questions.length); 
    }

    $scope.rows = [[7,8,9],
                   [4,5,6],
                   [1,2,3],
                   ["C",0,"B"]];



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
        if (!$scope.curQuestion) {
            return;
        }
        if ($scope.curQuestion.input.length == 0) {
            return;
        }
        $scope.curQuestion.check();
        $scope.curQuestionIndex++;
        if ($scope.curQuestionIndex < $scope.questions.length) {
            $scope.curQuestion = $scope.questions[$scope.curQuestionIndex];
            $scope.curQuestion.start();
        } else {
            $scope.finish();
        }
    }
    $scope.finish = function() {
        $scope.curQuestion = null;
        $scope.done = true;
        UsersDB.addResultToCurUser($scope.getSummary());
    }
    $scope.getSummary = function() {
        return {
            timestamp: new Date().getTime(),
            score: $scope.getScore(),
            timeForRight: $scope.getTimeForRight()
        };
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
    $scope.start = function() {
        $scope.questions = [];
        $scope.numQuestions = 10;
        $scope.questions = [];
        $scope.done = false;
        for (var i = 1 ; i <= $scope.numQuestions ; i++) {
            $scope.questions.push(new Question(i));
        }
        $scope.curQuestionIndex = 0;
        $scope.curQuestion = $scope.questions[$scope.curQuestionIndex];
        $scope.curQuestion.start();
    }
    $scope.start(); 
}]);


app.controller('KeyController',['$scope','$location',
function($scope,$location) {
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


