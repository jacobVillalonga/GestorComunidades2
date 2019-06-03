var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http) {
  $http.get('/incidencias/1')
    .then(function(data) {
      $scope.incidencia = data.data;
      console.log(data);
    });
});
