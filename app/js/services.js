"use strict";
var services = angular.module('my.services', []);

services.service('UsersDB', function() {
    this.setUp = function() {
    	console.log("In UsersDB.setUp()");
	    var names = ['ערן','יובל','עדו','רתם'];
	    this.allUsers = [];
	    var that = this;
	    names.forEach(function(n) {
	        that.allUsers.push({'name': n});
	    });
	    this.curUser = this.allUsers[0];
	}
	this.getCurUser = function() {
		return this.curUser;
	}
	this.getCurUserName = function() {
		return this.curUser.name;		
	}
	this.getAllUsers = function() {
		return this.allUsers;
	}
	this.switchUser = function(user) {
		this.curUser = user;
	}
	this.setUp();
});


