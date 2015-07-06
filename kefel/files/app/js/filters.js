var myFilters = angular.module('my.filters',[]);

myFilters.filter('joinList',function() {
	return function(lst) {
        return lst.join('');
	};
});

myFilters.filter('reverse',function() {
	return function(lst) {
        return lst.slice().reverse();
	};
});

myFilters.filter('toRange',function() {
	return function(num) {
		var result = [];
		for (var i =  0; i < num; i++) {
         	result.push(i);
		}
		return result;
	};
});

myFilters.filter('underscoreIfUndefinded',function() {
	return function(n) {
		if (n === null || n === undefined ) {
			return '_';
		} 
		return n;
	}
});


