(function(angular, _, moment) {
  'use strict';

  angular.module('app', []);

  angular.module('app').controller('controller', ['$scope','tweetsService', function($scope, tweets) {


    window.console.log('ready!');
    var minutesBetweenTweetFetch = 10;
    // var msBetweenTweets = 15000;
    // var _lastTweetFetchMom;

    tweets.getTweets(minutesBetweenTweetFetch).then(function(response){
      window.console.log(response.data.statuses);
      var data = response.data;

      $scope.tweets = data.statuses;
      $scope.search = data.search_metadata;
    });
    // .error(function(err){
    //   console.log('error', err);
    // });

    // let's only fetch new tweets every 10 minutes or so
    // if (!_lastTweetFetchMom || moment().diff(_lastTweetFetchMom, 'minutes') >= minutesBetweenTweetFetch) {
    //   window.console.log('fetching new tweets');
    //   $scope.tweets = tweets.getTweets(minutesBetweenTweetFetch).tweets;
    //   window.console.log('get tweets', tweets.getTweets(minutesBetweenTweetFetch));
    //   _lastTweetFetchMom = moment();
    // } else {
    //   window.console.log('not time to fetch new tweets yet');
    // }

    // var cycleForever = function(){
    //   return tweets.rotateTweets()
    //   .then(function(){
    //     return Q.delay(1000);
    //   })
    //   .then(function(){
    //     return cycleForever();
    //   })
    // };
    // cycleForever();
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
