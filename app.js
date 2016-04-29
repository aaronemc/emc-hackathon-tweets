(function(angular, _, moment) {
  'use strict';

  angular.module('emcTweetApp', [])
    .controller('main-controller', ['$scope', '$http', function($scope, $http) {
      $scope.hasAuthenticated = false;

      $http.post('/auth')
        .then(function(response) {
            $scope.hasAuthenticated = response.data.auth;

            return $http.get('/tweets')
          },
          function(err) {
            console.log('error', err);
          })
        .then(function(response) {
          console.log('received tweets', response);
          $scope.tweets = response.data;

        }, function(err) {
          console.log('err', err);
        });
    }])

})(window.angular, window._, window.moment);
