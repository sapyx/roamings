Meteor.startup(function() {
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
});


onReady = function () {
    angular.bootstrap(angular.element("html")[0], ['roamingsApp']); //Full jQuery only
    angular.element(".spinner").hide();
    angular.element(".banner").hide();
};

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}