(function(angular, _, moment) {
  'use strict';

  angular.module('app', [])
  .controller('controller', ['$scope','$interval', 'tweetsService', function($scope, $interval, tweets) {

    $scope.active = -1;
    $scope.tweets = [];

    var init = function(){
      tweets.getTweets().then(
        function success(response){
          var data = response.data;
          window.console.log(data.statuses[0]);
          $scope.tweets = data.statuses.reverse();
          // $scope.tweets = _.first(data.statuses.reverse(), 5);
          $scope.search = data.search_metadata;
          $scope.active = 0;
        },
        function fail(err){
          console.log('error', err);
        }
      );
    };

    init();

    $scope.styleCard = function(tweet){
      return {
        backgroundColor: '#' + tweet.user.profile_background_color,
        backgroundImage: 'url('+tweet.user.profile_background_image_url+')',
        color: '#' + tweet.user.profile_text_color
      }
    };

    $interval(function(idx){
      if(idx % $scope.tweets.length === 0) {
        window.console.log('hello', idx);
        init();
      } else {
        if($scope.tweets.length) {
          $scope.active = (($scope.active + 1) % ($scope.tweets.length));
        }
      }
    }, 1500);

    $scope.$watch('active', function(n){
      var el = angular.element('.active');
      var half = -el.outerWidth()/2;
      if(n === 0) {
        angular.element('body').scrollTo({left:half, top: 0}, 300); //, {offset:{left:half}});
      } else {
        angular.element('body').scrollTo('.active', 300, {offset:{left:half}});
      }
    });

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
