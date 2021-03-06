var app = angular.module("myApp", ['ui.router','LocalStorageModule','angular-loading-bar','ui.bootstrap','smart-table','ngSanitize','mgo-angular-wizard','ngCsv','ngClipboard','angular-momentjs']);


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
    .state('reset', {
        url:'/reset', 
        templateUrl:'../features/dest/resetpass/reset.html',
        controller:'resetCtrl'
    })
    .state('reset_email', {
        url:'/reset_email',
        templateUrl:'../features/dest/resetpass/resetEmail.html',
        controller:'resetEmailCtrl'
    })
    .state('reset_password', {
        url:'/reset_password',
        templateUrl:'../features/dest/resetpass/resetPassword.html',
        controller:'resetPasswordCtrl'
    })
    .state('reset_success', {
        url:'/reset_success',
        templateUrl:'../features/dest/resetpass/resetSuccess.html',
        controller:'resetSuccessCtrl'
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
    })
    .state('app.merchants.groups', {
        url:'/groups',
        templateUrl:'../features/dest/merchants/groups.html',
        controller:'groupsCtrl'
    })
    .state('app.virtual_terminal', {
        url:'/virtual_terminal',
        templateUrl:'../features/dest/vterminal/vterminal.html',
        controller:'vterminalCtrl'
    })
    .state('app.usermanager', {
        url:'/usermanager',
        templateUrl:'../features/dest/usermanager/usermanager.html',
        controller:'usermanagerCtrl'
    })
    .state('app.mock', {
        url:'/mock',
        templateUrl:'../features/dest/mock/mock.html',
        controller:'mockCtrl'
    })
    .state('app.single', {
        url:'/single',
        templateUrl:'../features/dest/mock/mockSingle.html'
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
