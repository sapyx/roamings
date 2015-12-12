
/**
 * Created by Sapyx on 05/12/2015.
 */

Meteor.startup(function () {
    Inject.rawHead('loader-style',
        '<meta name="viewport" content="width=device-width,maximum-scale=1,initial-scale=1,user-scalable=no">' +
        '<style id="tmp">' +
            'html{background-color: #36342e;}' +
            '.banner {' +
                'text-align:center;' +
            '}' +
            '.spinner {' +
                'bottom:0;height:80px;left:0;margin:auto;position:absolute;' +
                'top:0;right:0;width:80px;' +
                '-webkit-animation: rotation .6s infinite linear;' +
                'animation: rotation .6s infinite linear;' +
                'border-left:6px solid rgba(255,194,0,.20);' +
                'border-right:6px solid rgba(255,194,0,.20);' +
                'border-bottom:6px solid rgba(255,194,0,.20);' +
                'border-top:6px solid rgba(255,194,0,.9);' +
                'border-radius:100%;' +
            '}' +
            '@-webkit-keyframes rotation {' +
                'from {-webkit-transform: rotate(0deg);}' +
                'to {-webkit-transform: rotate(359deg);}' +
            '}' +
            '@-moz-keyframes rotation {' +
                'from {-moz-transform: rotate(0deg);}' +
                'to {-moz-transform: rotate(359deg);}' +
            '}' +
            '@-o-keyframes rotation {' +
                'from {-o-transform: rotate(0deg);}' +
                'to {-o-transform: rotate(359deg);}' +
            '}' +
            '@keyframes rotation {' +
                'from {transform: rotate(0deg);}' +
                'to {transform: rotate(359deg);}' +
            '}' +
        '</style>'
    );

    Inject.rawHead('loader-body',
        '<body>'+
            '<div class="spinner"></div>'+
            '<h1 class="banner">Roamings </h1>'+
            '<h2 class="banner">Loading codebase, please wait... </h2>'+
        '</body>'
    );
});
