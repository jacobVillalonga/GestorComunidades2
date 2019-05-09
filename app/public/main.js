
// var myAppModule = angular.module('angularTodo', []);
// function mainController($scope, $http) {
// 	$scope.formData = {};
//   $scope.title = "eo";
//
// 	// Cuando se cargue la página, pide del API todos los TODOs
// 	$http.get('/comunidades/:idComunidad/viviendas/:idVivienda')
// 		.success(function(data) {
// 			$scope.todos = data;
//       console.log("OKI");
// 			console.log(data)
// 		})
// 		.error(function(data) {
// 			console.log('Error: ' + data);
// 		});
// }

var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope) {
 $scope.firstName = "John";
 $scope.lastName = "Doe";
});
