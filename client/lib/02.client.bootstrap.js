onReady = function () {
    angular.bootstrap(angular.element("html")[0], ['roamingsApp']); //Full jQuery only
};

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}