"use strict";
var services = angular.module('my.services', []);

services.service('KefelConfig',['$window',function($window) {
	this.numQuestions = 10;
}]);

services.service('UsersDB', ['$window',function($window) {
	this.parseOrNull = function(key) {
		var jsonStr = $window.localStorage.getItem(key);
		return jsonStr? JSON.parse(jsonStr) : null;
	}
	this.updateLocalStorage = function() {
		this.writeToLocalStorage('allUsers',this.allUsers);
		this.writeToLocalStorage('curUserId',this.curUserId);
	}
	this.writeToLocalStorage = function(key,value) {
		$window.localStorage.setItem(key,angular.toJson(value));
	}
	this.readLocalStorage = function() {
		this.allUsers = this.parseOrNull('allUsers') || [];
	    this.curUserId = this.parseOrNull('curUserId') || 0;
	}
	this.findUser = function(func) {
		for (var i = 0 ; i < this.allUsers.length; i++) {
			var u = this.allUsers[i];
			if (func(u)) {
				return u;
			}
		}
		return null;
	}
	this.findUserById = function(id) {
		if ( id == 0 ) {
			return null;
		}
		return this.findUser(function(u) {
			return u.id == id;
		});
	}
    this.setUp = function() {
    	console.log("In UsersDB.setUp()");
	    this.readLocalStorage();
	}
	this.getCurUser = function() {
		return this.findUserById(this.curUserId);
	}
	this.getCurUserResults = function() {
		return this.parseOrNull('results-' + this.curUserId) || [];
	}
	this.isLegalNewUser = function(name) {
		return !this.findUser(function(u) {
			return u.name == name;
		});
 	}
 	this.getMaxId = function() {
 		var maxId = 0;
 		this.allUsers.forEach(function(u) {
 			maxId = Math.max(u.id,maxId);
 		});
 		return maxId;
 	}
 	this.addNewUser = function(name) {
 		var u = {
 			name: name,
 			id: this.getMaxId() + 1
 		};
 		this.allUsers.push(u);
 		this.curUserId = u.id;
 		this.updateLocalStorage();
 	}
	this.getCurUserName = function() {
		var cu = this.getCurUser()
		return cu ? cu.name : 'אורח';
	}
	this.getAllUsers = function() {
		return this.allUsers;
	}
	this.switchUser = function(user) {
		this.curUserId = user.id;
		this.updateLocalStorage();
	}
	this.addResultToCurUser = function(result) {
		var user = this.getCurUser();
		if (!user) {
			return;
		}
		var key = 'results-' + user.id
		var results = this.parseOrNull(key) || [];
		results.push(result);
		this.writeToLocalStorage(key,results);
	}
	this.setUp();
}]);


