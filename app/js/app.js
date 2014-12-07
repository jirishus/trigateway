var app = angular.module("myApp", ['ui.router','LocalStorageModule','angular-loading-bar','ui.bootstrap']);


app.constant('ngAuthSettings', {
    apiServiceBaseUri: 'https://auth.tripayments.com/',
    clientId: 'tpLocal'
});


app.config(function($stateProvider, $urlRouterProvider, $locationProvider,$httpProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
    .state('login', {
        url:'/login',
        templateUrl:'../features/dest/login/login.html',
        controller:'loginCtrl'
    })
    .state('app', {
        abstract:true,
        url:'',
        templateUrl:'../features/dest/app/app.html',
        controller:'appCtrl'
    })
    .state('app.search', {
        url:'/search',
        templateUrl:'../features/dest/search/search.html',
        controller:'searchCtrl'
    })
    .state('app.merchants', {
        url:'/merchants',
        templateUrl:'../features/dest/merchants/merchants.html'
    })
    .state('app.merchants.mids', {
        url:'/mids',
        templateUrl:'../features/dest/merchants/mids.html',
        controller:'midsCtrl'
    });

    // REMOVE HASH(#) FROM URL
    //$locationProvider.html5Mode(true);

    // INTERCEPTOR SERVICe
    $httpProvider.interceptors.push('authInterceptorService');

});
app.constant('baseUrl', "http://api.testing.tripayments.com/");

app.run(['$rootScope', '$state', '$stateParams', '$location','authService', function ($rootScope, $state, $stateParams, $location,authService,$scope) {

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // AUTH SERVICE
    authService.fillAuthData();

}]);
