// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var db;
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova','starter.services'])

.run(function($ionicPlatform,$cordovaSQLite) {
      $ionicPlatform.ready(function() {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

          }
          if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
          }
          if (window.cordova) {
            
           db = $cordovaSQLite.openDB({name:"my.db",location:'default'});
           // db = $cordovaSQLite.openDB("my.db");
          } 
          else {
            db = window.openDatabase("my.db", "1.0", "bookshelf", -1);
          }
         
          $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS bookshelf (id integer primary key,title text,author text,publisher text,summary text)")
          });
      })

    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'templates/search.html'
          }
        }
      })

      .state('app.scan', {
          url: '/scan',
          views: {
            'menuContent': {
              templateUrl: 'templates/scan.html',
              controller: 'scanCtrl'
            }
          }
        })
      .state('app.booklists',{
        url: '/booklists',
        views:{
          'menuContent':{
            templateUrl: 'templates/bookLists.html',
            controller: 'booklistsCtrl'
          }
        }
      })
        .state('app.browse', {
          url: '/browse',
          views: {
            'menuContent': {
              templateUrl: 'templates/browse.html',
               controller: 'browseCtrl'

            }
          }
        })
        .state('app.playlists', {
          url: '/playlists',
          views: {
            'menuContent': {
              templateUrl: 'templates/playlists.html',
              controller: 'PlaylistsCtrl'
            }
          }
        })

      .state('app.single', {
        url: '/booklists/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/booklist.html',
            controller: 'BookDetailCtrl'
          }
        }
      });
      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/app/playlists');
    });