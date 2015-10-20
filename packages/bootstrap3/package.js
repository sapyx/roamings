// package metadata file for Meteor.js

/* jshint strict:false */
/* global Package:true */

Package.describe({
    name: 'sapyx:bootstrap',
    summary: 'The most popular front-end framework for developing responsive, mobile first projects on the web. (Bootstrap version 3.3.4)',
    version: '0.0.1',
    git: ''
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.2');
    api.use('jquery', 'client');
    api.addAssets([
        'fonts/glyphicons-halflings-regular.eot',
        'fonts/glyphicons-halflings-regular.svg',
        'fonts/glyphicons-halflings-regular.ttf',
        'fonts/glyphicons-halflings-regular.woff',
        'fonts/glyphicons-halflings-regular.woff2'
    ], 'client');
    api.addFiles(['js/bootstrap_modal.js',
        'css/bootstrap.css',
        'css/bootstrap-theme.css'], 'client');
});
