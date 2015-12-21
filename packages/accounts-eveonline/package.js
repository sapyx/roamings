Package.describe({
    name: 'sapyx:accounts-eveonline',
    version: '0.2.1',
    summary: 'Authentication with EvE Online SSO with char info',
    git: '',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1');

    api.use(
        [
            'accounts-base',
            'accounts-oauth',
            'oauth',
            'oauth2',
            'http',
            'service-configuration'
        ],
        ['client', 'server']
    );

    api.use('random', 'client');

    api.addFiles('js/eveonline_common.js', ['client', 'server']);
    api.addFiles('js/eveonline_client.js', 'client');
    api.addFiles(
        [
            'js/eveonline_service_configuration.js',
            'js/eveonline_server.js',
            'js/eveonline_server_helpers.js',
            'js/eveonline_api.js'
        ],
        'server'
    );

    api.export('EveonlineHelpers', 'server');
});