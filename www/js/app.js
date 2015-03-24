// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.help', {
    url: "/help",
    views: {
      'menuContent': {
        templateUrl: "templates/help.html"
      }
    }
  })

  .state('app.cart', {
    url: "/cart",
    views: {
      'menuContent': {
        templateUrl: "templates/cart.html",
        controller: 'cartCtrl'
      }
    }
  })

  .state('app.catalog', {
    url: "/catalog",
    views: {
      'menuContent': {
        templateUrl: "templates/catalog.html",
        controller: 'CatalogCtrl'
      }
    }
  })
  
  .state('app.about', {
    url: "/about",
    views: {
      'menuContent': {
        templateUrl: "templates/about.html",
        controller: 'DeviceCtrl'
      }
    }
  })
    .state('app.main', {
      url: "/main",
      views: {
        'menuContent': {
          templateUrl: "templates/main.html",
          controller: 'BarcodeCtrl'
        }
      }
    })

  .state('app.product', {
    url: "/product/:productId",
    views: {
      'menuContent': {
        templateUrl: "templates/product.html",
        controller: 'productCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
});
