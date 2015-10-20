angular.module('roamingsApp', [
    'angular-meteor',
    'ngAnimate',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    //'ui.bootstrap',
    //'ui.bootstrap.datetimepicker',
    'angular-loading-bar',
    'xml',
    'ncy-angular-breadcrumb',
    'LocalStorageModule',
    'mgcrea.ngStrap',
    //'dcbImgFallback'
])
    /*
     .module('roamingsApp', [
     'ngCookies',
     ])

     .run(function ($browser) {
     $browser.baseHref = function () {
     return "/"
     };

     .config(function ($logProvider) {
     $logProvider.debugEnabled(true);
     })*/
    .config(function ($resourceProvider) {
        angular.extend($resourceProvider.defaults, {
            stripTrailingSlashes: false
        });
    })

    .config(function ($datepickerProvider) {
        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'yyyy/MM/dd',
            dateType: 'date',
            startWeek: 1,
            autoclose: 1,
            container: 'body'
        });
    })
    .config(function ($timepickerProvider) {
        angular.extend($timepickerProvider.defaults, {
            timeFormat: 'HH:mm',
            timeType: 'date',
            autoclose: 1,
            container: 'body'
        });
    })
    .config(function ($alertProvider) {
        angular.extend($alertProvider.defaults, {
            //placement: 'top-right',
            type: 'info',
            container: '#alert',
            duration: 3,
            animation: 'am-fade-and-slide-top',
            show: true
        });
    })
    .config(function ($popoverProvider) {
        angular.extend($popoverProvider.defaults, {
            animation: 'am-fade-and-scale',
            trigger: 'hover'
        });
    })
    .config(function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('Roamings')
            .setStorageType('localStorage')
            .setNotify(true, true);
    })
    .config(function ($breadcrumbProvider) {
        $breadcrumbProvider.setOptions({
            prefixStateName: 'home',
            includeAbstract: true
        });
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('xmlHttpInterceptor');
    });


onReady = function () {
    angular.bootstrap(angular.element("html")[0], ['roamingsApp']); //Full jQuery only
};

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}