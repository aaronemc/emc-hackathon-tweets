(function(angular, _, moment) {
  'use strict';

  var brightness = function(color){
    var r, g, b, brightness;

    if (color.match(/^rgb/)) {
      color = color.match(/rgb\(([^)]+)\)/)[1];
      color = color.split(/ *, */).map(Number);
      r = color[0];
      g = color[1];
      b = color[2];
    } else if ('#' === color[0] && 7 === color.length) {
      r = parseInt(color.slice(1, 3), 16);
      g = parseInt(color.slice(3, 5), 16);
      b = parseInt(color.slice(5, 7), 16);
    } else if ('#' === color[0] && 4 === color.length) {
      r = parseInt(color[1] + color[1], 16);
      g = parseInt(color[2] + color[2], 16);
      b = parseInt(color[3] + color[3], 16);
    }

    brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness;
  };

  angular.module('app', [])
  .controller('controller', ['$scope','$interval', 'tweetsService', function($scope, $interval, tweets) {

    $scope.active = -1;
    $scope.tweets = [];

    var intervalId = false;
    var startInterval = function(){
      return $interval(function(idx){
        if($scope.tweets.length) {
          $scope.active = (($scope.active + 1) % ($scope.tweets.length));
        }
        if(idx % $scope.tweets.length === 0) {
          init();
        }
      }, 7500);
    };

    var init = function(){
      tweets.getTweets().then(
        function success(response){
          //if(!intervalId) {
          //  intervalId = startInterval();
          //}
          var data = response;
          window.console.log(data.statuses[0]);
          $scope.tweets = data.statuses.reverse();
          // $scope.tweets = _.first(data.statuses.reverse(), 5);
          $scope.search = data.search_metadata;
        },
        function fail(err){
          console.log('error', err);
        }
      );
    };

    init();

    $scope.styleCard = function(tweet){
      var bg = '#' + tweet.user.profile_background_color;

      var bgBrightness = brightness(bg);

      var textColor = bgBrightness < 155 ? '#FFFFFF' : '#000000';

      return {
        backgroundColor: '#' + tweet.user.profile_background_color,
        // backgroundImage: 'url('+tweet.user.profile_background_image_url+')',
        color: textColor
      }
    };

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
