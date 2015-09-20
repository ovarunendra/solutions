var app = angular.module('myApp', []);

app.factory('dataService', ['$http', function($http){
	return {
		getData: function () {
			return $http.get('/data.json');
		}
	};
}]);

app.controller('demoController', ['dataService', function (dataService){
	var demo = this, masterData = [];
	// get mock data from data.json
	dataService.getData().then(function(response){
		demo.records = response.data;
		// if data is saved at local storage update data
		if(localStorage && localStorage["prob3"]) {
			demo.records = JSON.parse(localStorage.getItem("prob3"));
		}
		_.each(demo.records, function(value) {
			masterData.push(_.clone(value)); // get a clone of original data
		})
	});
	demo.undo = function(index) {
		demo.records[index] = _.clone(masterData[index]); // update selected row with original data
	};
	demo.save = function() {
		_.each(demo.records, function (value) {
			value.isEdit = false;
		});
		console.log("Data to save ", demo.records);
		if (localStorage) {
			localStorage.setItem('prob3', JSON.stringify(demo.records));
		}
	};
}]);