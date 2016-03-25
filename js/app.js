(function(angular, _, moment) {
  'use strict';

  angular.module('app', []);

  angular.module('app').controller('controller', ['$scope','tweetsService', function($scope, tweets) {


    window.console.log('ready!');
    tweets.getTweets().then(
      function success(response){
        window.console.log(response.data.statuses);
        var data = response.data;

        $scope.tweets = data.statuses;
        $scope.search = data.search_metadata;
      },
      function fail(err){
        console.log('error', err);
      }
    );
  }])

  .factory('tweetsService', ['$http', function($http){
    var _getTweets = function() {
        return $http({
          method: 'GET',
          url: '/tweets'
        });
    };

    return {
      getTweets: _getTweets
    };

  }]);

})(window.angular, window._, window.moment);
