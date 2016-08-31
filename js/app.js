(function(angular, _, moment) {
  'use strict';

  angular.module('app', [])
    .controller('myCtrl', ['$scope', function($scope) {

    $scope.tweets = [];

    var socket = io();
    socket.on('notification', function (response) {
      $scope.tweets.splice(0,0,response.data);
      $scope.$apply();
    })

  }]);

})(window.angular, window._, window.moment);
