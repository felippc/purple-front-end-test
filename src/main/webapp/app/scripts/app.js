'use strict';


window.jQuery = window.$ = require('../../../../../bower_components/jquery/dist/jquery.js');
require('../../../../../bower_components/bootstrap/dist/js/bootstrap.js');
//Angular
require('angular');
require('angular-route');
require('angular-animate');
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
    'ngRoute',
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
          }, 'LoginCtrl-chunk');

          return deferred.promise;
        }]
      }
    })
    .when('/list-itens', {
      templateUrl: 'views/list-itens.html',
      controller: 'ListItensCtrl',
      resolve: {
        load: ['$q', function($q) {
          var deferred = $q.defer();

          require.ensure([], function(require) {
            require('./controllers/list-itens');
            deferred.resolve();
          }, 'ListItensCtrl-chunk');

          return deferred.promise;
        }]
      }
    })
    .otherwise({
      redirectTo: '/'
    });
});