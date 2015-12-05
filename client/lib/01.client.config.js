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
    })
    .config(function (lazyImgConfigProvider) {
        lazyImgConfigProvider.setOptions({
            offset: 100, // how early you want to load image (default = 100)
            successClass: 'img-load-success' // in case of loading image success what class should be added (default = null)
        });
    })
/*    .config([
        'RestangularProvider', function (RestangularProvider) {
/!*            RestangularProvider.setResponseExtractor(function (response) {
                var newResponse = response;
                if (angular.isArray(response)) {
                    angular.forEach(newResponse, function (value, key) {
                        newResponse[key].data = angular.copy(value);
                    });
                } else {
                    newResponse.data = angular.copy(response);
                }

                return newResponse;
            });*!/

            RestangularProvider.setResponseInterceptor(function (data, operation, what, url, response, deferred) {
                var headers = response.headers();
                var result = response.data;
                result.headers = headers;
                return result;
            });
        }])*/;