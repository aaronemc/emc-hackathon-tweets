/*
  This function gets called when the index.html page loads
*/
(function(angular, _, moment) {
  'use strict';

  /*
    This is the main module definition for your angular app.

    We have one controller that does nothing
  */
  angular.module('emcTweetApp', [])
    .controller('main-controller', ['$scope', function($scope) {
    }])

})(window.angular, window._, window.moment);
