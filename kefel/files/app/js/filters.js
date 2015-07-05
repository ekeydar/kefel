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


