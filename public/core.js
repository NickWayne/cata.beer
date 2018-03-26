var beerapp = angular.module('beerapp', []).controller('testController', testController);


function testController($scope, $http) {
    $http({
      method: 'GET',
      url: '/api/beer'
    }).then(function successCallback(response) {
        console.log(response.data)
        $scope.beers = response.data;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

}
