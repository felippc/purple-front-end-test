'use strict';


window.jQuery = window.$ = require('../../../../../bower_components/jquery/dist/jquery.js');
require('../../../../../bower_components/bootstrap/dist/js/bootstrap.js');
//Angular
require('angular');
require('angular-route');
require('angular-animate');
require('angular-aria');
require('angular-messages');
require('angular-resource');
require('angular-sanitize');
require('angular-touch');
require('angular-bootstrap');

/**
 * @ngdoc overview
 * @name frontEndApp
 * @description
 * # frontEndApp
 *
 * Main module of the application.
 */
var app = angular
  .module('frontEndApp', [
    'ngAnimate',
    'ngAria',
    //'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ]);

app.config(function($routeProvider, $controllerProvider) {
  app.controller = $controllerProvider.register;

  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl',
      resolve: {
        load: ['$q', function($q) {
          var deferred = $q.defer();

          require.ensure([], function(require) {
            require('angular-bootstrap');
            require('./controllers/login');
            deferred.resolve();
          });

          return deferred.promise;
        }]
      }
    })
    // .when('/about', {
    //   templateUrl: 'views/about.html',
    //   controller: 'AboutCtrl',
    //   controllerAs: 'about'
    // })
    .otherwise({
      redirectTo: '/'
    });
});