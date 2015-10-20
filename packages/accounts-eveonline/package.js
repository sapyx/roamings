Package.describe({
  name: 'sapyx:accounts-eveonline',
  version: '0.1.1',
  summary: 'Authentication with EvE Online SSO',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1');

  api.use('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('oauth2', ['client', 'server']);
  api.use('http', ['client', 'server']);
  api.use('service-configuration', ['client', 'server']);
  api.use('random', 'client');
  api.use('templating', 'client');
  api.use('sapyx:bootstrap', 'client');

  api.addFiles(['views/eveonline_configure.html', 'js/eveonline_configure.js'], 'client');
  api.addFiles('js/eveonline_common.js', ['client', 'server']);
  api.addFiles('js/eveonline_server.js', 'server');
  api.addFiles('js/eveonline_client.js', 'client');
  api.addFiles('js/eveonline_server_helpers.js', 'server');

  api.export('EveonlineHelpers', 'server');
});
