var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope) {

  $http.get('/incidencias/1')
		.success(function(data) {
			$scope.incidencia = data;
			console.log(data)
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
    
});
