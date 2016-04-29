(function(angular, _, moment) {
  'use strict';

  angular.module('emcTweetApp', [])
    .controller('main-controller', ['$scope', '$http', function($scope, $http) {
      $scope.hasAuthenticated = false;

      $http.post('/auth')
        .then(function(response) {
            console.log('received', response);
            $scope.hasAuthenticated = response.data.auth;
          },
          function(err) {
            console.log('error', err);
          })
    }])

})(window.angular, window._, window.moment);
