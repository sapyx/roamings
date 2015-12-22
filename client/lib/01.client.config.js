angular.module('roamingsApp')
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
//            container: '#alert',
            container: 'body',
            placement: 'top-right',
            type: 'info',
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
    })
    .config(function (lazyImgConfigProvider) {
        lazyImgConfigProvider.setOptions({
            offset: 100, // how early you want to load image
            successClass: 'img-load-success' // in case of loading image success what class should be added
        });
    })
    .config(function ($logProvider, $provide) { // log service decorator

        $logProvider.debugEnabled(true); // DEBUG flag

        $provide.decorator('$log', ($delegate) => {
            //Original methods
            var origInfo = $delegate.info;
            var origLog = $delegate.log;

            //Override the default behavior
            $delegate.info = function () {

                if ($logProvider.debugEnabled())
                    origInfo.apply(null, arguments)
            };

            //Override the default behavior
            $delegate.log = function () {

                if ($logProvider.debugEnabled())
                    origLog.apply(null, arguments)
            };

            return $delegate;
        });
    });