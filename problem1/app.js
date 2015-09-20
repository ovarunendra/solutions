var app = angular.module('myApp', ['ngTable']);

app.factory('dataService', ['$http', function($http){
	return {
		getData: function () {
			return $http.get('/data.json')
		}
	};
}]);

app.controller('demoController', ['NgTableParams', 'dataService', function (NgTableParams, dataService){
	var demo = this; 
	dataService.getData().then(function(response){
		demo.tableParams = new NgTableParams({}, {
      		dataset: response.data
    	});
	});
}]);