/*Meteor.startup(function() {
 var $head, $tags, tag, _i, _len, _ref, _results;
 $head = $('head');
 _ref = ['meta', 'title'];
 _results = [];
 for (_i = 0, _len = _ref.length; _i < _len; _i++) {
 tag = _ref[_i];
 $tags = $(tag);
 $head.append($tags.clone());
 _results.push($tags.remove());
 }
 return _results;
 });*/

Meteor.startup(() => {
    angular.element(".spinner").remove();
    angular.element(".banner").remove();

    angular.element("#tmp").remove();
});

onReady = () => angular.bootstrap(angular.element("html")[0], ['roamingsApp']); //Full jQuery only

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}