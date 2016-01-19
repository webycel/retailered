retaileredApp.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('tabsController.addItem', {
      url: '/items/add',
      views: {
        'add_item_tab': {
          templateUrl: 'templates/addItem.html',
          controller: 'AddItemCtrl'
        }
      }
    })

    .state('tabsController.settings', {
      url: '/settings',
      views: {
        'settings_tab': {
          templateUrl: 'templates/settings.html',
          controller: 'settingsCtrl'
        }
      }
    })

    .state('tabsController.myItems', {
      url: '/myitems',
      views: {
        'my_items_tab': {
          templateUrl: 'templates/myItems.html',
          controller: 'MyItemsCtrl'
        }
      }
    })

    .state('tabsController.alerts', {
      url: '/alerts',
      views: {
        'alerts_tab': {
          templateUrl: 'templates/alerts.html',
          controller: 'alertsCtrl'
        }
      }
    })

    .state('tabsController', {
      url: '',
      abstract: true,
      templateUrl: 'templates/tabsController.html'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/myitems');

});
