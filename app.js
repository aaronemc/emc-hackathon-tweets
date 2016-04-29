(function(angular, _, moment) {
  'use strict';

  angular.module('emcTweetApp', [])
    .controller('main-controller', ['$scope', '$http', function($scope, $http) {

      $http.get('/foo')
        .then(function(response) {
            $scope.data = response.data;
          },
          function(err) {

          })
    }])

})(window.angular, window._, window.moment);
