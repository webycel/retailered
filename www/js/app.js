// Ionic retailered App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'retailered' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'retailered.controllers' is found in controllers.js
angular.module('retailered', ['ionic', 'ngCouchbaseLite', 'retailered.controllers'])

.run(function($ionicPlatform) {
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

    if(!window.cblite) {
        console.log("Couchbase Lite is not installed!");
    } else {
        cblite.getURL(function(err, url) {
            if(err) {
                alert("There was an error getting the database URL");
                return;
            }
            retaileredDatabase = new $couchbase(url, "todo");
            // 2
            retaileredDatabase.createDatabase().then(function(result) {
                var todoViews = {
                    lists: {
                        map: function(doc) {
                            if(doc.type == "list" && doc.title) {
                                emit(doc._id, {title: doc.title, rev: doc._rev})
                            }
                        }.toString()
                    },
                    tasks: {
                        map: function(doc) {
                            if(doc.type == "task" && doc.title && doc.list_id) {
                                emit(doc.list_id, {title: doc.title, list_id: doc.list_id, rev: doc._rev})
                            }
                        }.toString()
                    }
                };
                retaileredDatabase.createDesignDocument("_design/todo", todoViews);
                retaileredDatabase.listen();
            }, function(error) {
                // There was an error creating the database
            });
         });
     }
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

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
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
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});

var retaileredDatabase = null;
