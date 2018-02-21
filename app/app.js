/**
 * @ngdoc overview
 * @name AngularFrontend
 * @description
 * # AngularFrontend
 *
 * Main module of the application.
 */
var AngularFrontend = angular.module('AngularFrontend', ['ui.router', 'ui.bootstrap', 'base64']);

AngularFrontend.config(['$stateProvider', '$urlRouterProvider', '$logProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $logProvider, $httpProvider) {
	'use strict';

	// ----------------
	// IE Caching Issue
	// ----------------

	// Initialize get if not there
	if (!$httpProvider.defaults.headers.get) {
		$httpProvider.defaults.headers.get = {};
	}

	// Disable IE ajax request caching
	$httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';

	// Extra
	$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
	$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';



	// ---------------------------
	// Enable/Disable $log.debug()
	// ---------------------------

	$logProvider.debugEnabled(true);


	// --------------
	// Routing
	// --------------

	$stateProvider
		.state('main', {
			url: "/",
			templateUrl: "components/main/main.html",
			controller: "MainCtrl",
			controllerAs: "mainVM",
		});

	$urlRouterProvider.otherwise("/");

	// disable all debug messages
	$logProvider.debugEnabled(true);

}]);


// ---------------------------
// Session Management handling
// ---------------------------

AngularFrontend.run(function ($rootScope, $state, $log, $location, $window) {});
